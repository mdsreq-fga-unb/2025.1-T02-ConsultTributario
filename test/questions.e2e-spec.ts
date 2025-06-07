import { Test, TestingModule } from '@nestjs/testing';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from '../src/app.module';
import * as request from 'supertest';
import { startMemoryServer, stopMemoryServer, clearDatabase } from './mongodb-memory';
import { ValidationPipe } from '@nestjs/common';

describe('Questions E2E', () => {
  let app: NestFastifyApplication;

  beforeAll(async () => {
    await startMemoryServer();
  });

  afterAll(async () => {
    await stopMemoryServer();
  });

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication<NestFastifyApplication>(new FastifyAdapter());

    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        forbidNonWhitelisted: true,
        whitelist: true,
      }),
    );

    await app.init();
    await app.getHttpAdapter().getInstance().ready();
    await clearDatabase();
  });

  describe('/questions (POST)', () => {
    it('should create a question', async () => {
      const res = await request(app.getHttpServer())
        .post('/questions')
        .send({
          label: 'any_label',
          tooltip: 'any_tooltip',
          relatedQuestions: [],
        })
        .expect(201);

      expect(res.body).toHaveProperty('_id');
      expect(res.body.label).toBe('any_label');
      expect(res.body.tooltip).toBe('any_tooltip');
      expect(res.body.relatedQuestions).toEqual([]);
    });

    it('should return 400 if label is missing', async () => {
      await request(app.getHttpServer())
        .post('/questions')
        .send({ tooltip: 'any_tooltip', relatedQuestions: [] })
        .expect(400);
    });

    it('should return 400 if relatedQuestions contains invalid ObjectId', async () => {
      await request(app.getHttpServer())
        .post('/questions')
        .send({
          label: 'any_label',
          tooltip: 'any_tooltip',
          relatedQuestions: ['invalid-id'],
        })
        .expect(400);
    });

    it('should return 400 if relatedQuestions contains non-existent question ID', async () => {
      const nonExistentId = '605fe2a85d28392b8c800000';
      const res = await request(app.getHttpServer())
        .post('/questions')
        .send({
          label: 'any_label',
          tooltip: 'any_tooltip',
          relatedQuestions: [nonExistentId],
        })
        .expect(400);

      expect(res.body.message).toContain('invalid related question IDs');
    });
  });

  describe('/questions (GET)', () => {
    it('should return an empty array when no questions exist', async () => {
      const res = await request(app.getHttpServer()).get('/questions').expect(200);
      expect(res.body).toEqual([]);
    });

    it('should return all questions', async () => {
      await request(app.getHttpServer()).post('/questions').send({
        label: 'question1',
        tooltip: 'tooltip1',
        relatedQuestions: [],
      });

      const res = await request(app.getHttpServer()).get('/questions').expect(200);

      expect(res.body).toBeInstanceOf(Array);
      expect(res.body.length).toBe(1);
      expect(res.body[0].label).toBe('question1');
      expect(res.body[0].tooltip).toBe('tooltip1');
      expect(res.body[0].isActive).toBe(true);
    });
  });

  describe('/questions/:id (PATCH)', () => {
    let questionId: string;

    beforeEach(async () => {
      const createResponse = await request(app.getHttpServer())
        .post('/questions')
        .send({
          label: 'initial_label',
          tooltip: 'initial_tooltip',
          relatedQuestions: [],
        })
        .expect(201);
      questionId = createResponse.body._id;
    });

    it('should update a question', async () => {
      const updatedData = {
        label: 'updated_label',
        isActive: false,
        tooltip: 'updated_tooltip',
      };
      const res = await request(app.getHttpServer()).patch(`/questions/${questionId}`).send(updatedData).expect(200);

      expect(res.body.label).toBe('updated_label');
      expect(res.body.tooltip).toBe('updated_tooltip');
      expect(res.body.isActive).toBe(false);
    });

    it('should return 404 if question ID to update does not exist', async () => {
      const nonExistentId = '605fe2a85d28392b8c800000';
      await request(app.getHttpServer()).patch(`/questions/${nonExistentId}`).send({ label: 'any_label' }).expect(404);
    });

    it('should return 400 if ID is not a valid MongoDB ObjectId', async () => {
      await request(app.getHttpServer()).patch('/questions/invalid-id-format').send({ label: 'any_label' }).expect(400);
    });

    it('should return 400 if relatedQuestions in payload contains non-existent question ID', async () => {
      const nonExistentRelatedId = '605fe2a85d28392b8c800001';
      await request(app.getHttpServer())
        .patch(`/questions/${questionId}`)
        .send({ relatedQuestions: [nonExistentRelatedId] })
        .expect(400);
    });

    it('should return 400 if relatedQuestions in payload contains the ID of the question being updated', async () => {
      await request(app.getHttpServer())
        .patch(`/questions/${questionId}`)
        .send({ relatedQuestions: [questionId] })
        .expect(400);
    });
  });
});
