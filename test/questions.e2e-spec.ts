import { Test, TestingModule } from '@nestjs/testing';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from '../src/app.module';
import * as request from 'supertest';
import { startMemoryServer, stopMemoryServer, clearDatabase } from './mongodb-memory';
import { ValidationPipe } from '@nestjs/common';
import { AuthHelper, createAuthHelper, TestUser } from './auth-helper';

describe('Questions E2E', () => {
  let app: NestFastifyApplication;
  let authHelper: AuthHelper;
  let adminUser: TestUser;
  let regularUser: TestUser;

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

    authHelper = createAuthHelper(app);
    const users = await authHelper.createTestUsers();
    adminUser = users.adminUser;
    regularUser = users.regularUser;
  });

  describe('/questions (POST)', () => {
    let existingQuestionIdNotActive: string;
    let existingQuestionIdActive: string;

    beforeEach(async () => {
      await clearDatabase();
      let response = await request(app.getHttpServer())
        .post('/questions')
        .set('Authorization', `Bearer ${adminUser.accessToken}`)
        .send({
          label: 'any_label 2',
          tooltip: 'any_tooltip',
          relatedQuestions: [],
        });

      existingQuestionIdActive = response.body._id;

      response = await request(app.getHttpServer())
        .post('/questions')
        .set('Authorization', `Bearer ${adminUser.accessToken}`)
        .send({
          label: 'any_label',
          tooltip: 'any_tooltip',
          relatedQuestions: [],
        });

      existingQuestionIdNotActive = response.body._id;

      await request(app.getHttpServer())
        .patch(`/questions/${existingQuestionIdNotActive}`)
        .set('Authorization', `Bearer ${adminUser.accessToken}`)
        .send({
          isActive: false,
        });
    });

    it('should create a question with valid data without related questions', async () => {
      const res = await request(app.getHttpServer())
        .post('/questions')
        .set('Authorization', `Bearer ${adminUser.accessToken}`)
        .send({
          label: 'valid_label',
          tooltip: 'valid_tooltip',
          relatedQuestions: [],
        })
        .expect(201);

      expect(res.body).toHaveProperty('_id');
      expect(res.body.label).toBe('valid_label');
      expect(res.body.tooltip).toBe('valid_tooltip');
      expect(res.body.relatedQuestions).toEqual([]);
    });

    it('should create a question with valid data with related questions', async () => {
      await request(app.getHttpServer())
        .post('/questions')
        .set('Authorization', `Bearer ${adminUser.accessToken}`)
        .send({
          label: 'valid_label',
          tooltip: 'valid_tooltip',
          relatedQuestions: [existingQuestionIdActive],
        })
        .expect(201);
    });

    it('should return 400 if related questions are not active', async () => {
      await request(app.getHttpServer())
        .post('/questions')
        .set('Authorization', `Bearer ${adminUser.accessToken}`)
        .send({
          label: 'valid_label',
          tooltip: 'valid_tooltip',
          relatedQuestions: [existingQuestionIdNotActive],
        })
        .expect(400);
    });

    it('should return 400 if label is missing', async () => {
      await request(app.getHttpServer())
        .post('/questions')
        .set('Authorization', `Bearer ${adminUser.accessToken}`)
        .send({ tooltip: 'valid_tooltip', relatedQuestions: [] })
        .expect(400);
    });

    it('should return 400 if label already exists', async () => {
      await request(app.getHttpServer())
        .post('/questions')
        .set('Authorization', `Bearer ${adminUser.accessToken}`)
        .send({ label: 'any_label', tooltip: 'valid_tooltip', relatedQuestions: [] })
        .expect(400);
    });

    it('should return 400 if relatedQuestions contains invalid ObjectId', async () => {
      await request(app.getHttpServer())
        .post('/questions')
        .set('Authorization', `Bearer ${adminUser.accessToken}`)
        .send({
          label: 'any_label',
          tooltip: 'any_tooltip',
          relatedQuestions: ['invalid-id'],
        })
        .expect(400);
    });

    it('should return 400 if relatedQuestions contains non-existent question ID', async () => {
      const nonExistentId = '605fe2a85d28392b8c800000';
      await request(app.getHttpServer())
        .post('/questions')
        .set('Authorization', `Bearer ${adminUser.accessToken}`)
        .send({
          label: 'any_label',
          tooltip: 'any_tooltip',
          relatedQuestions: [nonExistentId],
        })
        .expect(400);
    });
  });

  describe('/questions (GET)', () => {
    it('should return an empty array when no questions exist', async () => {
      const res = await request(app.getHttpServer())
        .get('/questions')
        .set('Authorization', `Bearer ${regularUser.accessToken}`)
        .expect(200);
      expect(res.body).toEqual([]);
    });

    it('should return all questions', async () => {
      await request(app.getHttpServer())
        .post('/questions')
        .set('Authorization', `Bearer ${adminUser.accessToken}`)
        .send({
          label: 'question1',
          tooltip: 'tooltip1',
          relatedQuestions: [],
        });

      const res = await request(app.getHttpServer())
        .get('/questions')
        .set('Authorization', `Bearer ${regularUser.accessToken}`)
        .expect(200);

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
        .set('Authorization', `Bearer ${adminUser.accessToken}`)
        .send({
          label: 'any_label',
          tooltip: 'any_tooltip',
          relatedQuestions: [],
        });

      questionId = createResponse.body._id;
    });

    it('should update a question', async () => {
      const updatedData = {
        label: 'updated_label',
        isActive: false,
        tooltip: 'updated_tooltip',
      };
      const res = await request(app.getHttpServer())
        .patch(`/questions/${questionId}`)
        .set('Authorization', `Bearer ${adminUser.accessToken}`)
        .send(updatedData)
        .expect(200);

      expect(res.body.label).toBe('updated_label');
      expect(res.body.tooltip).toBe('updated_tooltip');
      expect(res.body.isActive).toBe(false);
    });

    it('should return 404 if question ID to update does not exist', async () => {
      const nonExistentId = '605fe2a85d28392b8c800000';
      await request(app.getHttpServer())
        .patch(`/questions/${nonExistentId}`)
        .set('Authorization', `Bearer ${adminUser.accessToken}`)
        .send({ label: 'any_label' })
        .expect(404);
    });

    it('should return 400 if ID is not a valid MongoDB ObjectId', async () => {
      await request(app.getHttpServer())
        .patch('/questions/invalid-id-format')
        .set('Authorization', `Bearer ${adminUser.accessToken}`)
        .send({ label: 'any_label' })
        .expect(400);
    });

    it('should return 400 if relatedQuestions in payload contains non-existent question ID', async () => {
      const nonExistentRelatedId = '605fe2a85d28392b8c800001';
      await request(app.getHttpServer())
        .patch(`/questions/${questionId}`)
        .set('Authorization', `Bearer ${adminUser.accessToken}`)
        .send({ relatedQuestions: [nonExistentRelatedId] })
        .expect(400);
    });

    it('should return 400 if relatedQuestions in payload contains the ID of the question being updated', async () => {
      await request(app.getHttpServer())
        .patch(`/questions/${questionId}`)
        .set('Authorization', `Bearer ${adminUser.accessToken}`)
        .send({ relatedQuestions: [questionId] })
        .expect(400);
    });

    it('should return 400 if relatedQuestions are not active', async () => {
      const response = await request(app.getHttpServer())
        .post('/questions')
        .set('Authorization', `Bearer ${adminUser.accessToken}`)
        .send({
          label: 'inactive_question',
          tooltip: 'inactive_tooltip',
          relatedQuestions: [],
        });

      await request(app.getHttpServer())
        .patch(`/questions/${response.body._id}`)
        .set('Authorization', `Bearer ${adminUser.accessToken}`)
        .send({ isActive: false })
        .expect(200);

      await request(app.getHttpServer())
        .patch(`/questions/${questionId}`)
        .set('Authorization', `Bearer ${adminUser.accessToken}`)
        .send({ relatedQuestions: [response.body._id] })
        .expect(400);
    });
  });
});
