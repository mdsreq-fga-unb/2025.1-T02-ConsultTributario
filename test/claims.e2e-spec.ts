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

  describe('/claims (POST)', () => {
    let existingQuestionIdActive: string;
    let existingQuestionIdNotActive: string;
    let taxTypeId: string;

    beforeEach(async () => {
      await clearDatabase();
      let response = await request(app.getHttpServer()).post('/questions').send({
        label: 'any_label 2',
        tooltip: 'any_tooltip',
        relatedQuestions: [],
      });

      existingQuestionIdActive = response.body._id;

      response = await request(app.getHttpServer()).post('/questions').send({
        label: 'any_label',
        tooltip: 'any_tooltip',
        relatedQuestions: [],
      });

      existingQuestionIdNotActive = response.body._id;

      response = await request(app.getHttpServer()).post('/tax-types').send({
        name: 'any_name',
      });

      taxTypeId = response.body._id;

      await request(app.getHttpServer()).patch(`/questions/${existingQuestionIdNotActive}`).send({
        isActive: false,
      });
    });

    it('should create a claim with valid data', async () => {
      const res = await request(app.getHttpServer())
        .post('/claims')
        .send({
          title: 'Claim',
          objective: 'Objective for claim',
          summary: 'Summary for claim',
          recoverable_period: '12 months',
          recoverable_value: '1000',
          taxType: taxTypeId,
        })
        .expect(201);

      expect(res.body).toHaveProperty('_id');
      expect(res.body.title).toBe('Claim');
      expect(res.body.objective).toBe('Objective for claim');
      expect(res.body.summary).toBe('Summary for claim');
      expect(res.body.recoverable_period).toBe('12 months');
      expect(res.body.recoverable_value).toBe('1000');
      expect(res.body).toHaveProperty('createdAt');
      expect(res.body).toHaveProperty('updatedAt');
    });

    it('should return 400 if invalid data is provided', async () => {
      await request(app.getHttpServer())
        .post('/claims')
        .send({
          title: 'Claim 7',
          summary: 'Summary for claim 1',
          recoverable_period: '12 months',
          recoverable_value: '1000',
        })
        .expect(400);
    });

    it('should return 400 if title already exists', async () => {
      await request(app.getHttpServer()).post('/claims').send({
        title: 'Claim',
        summary: 'Summary for claim 1',
        recoverable_period: '12 months',
        recoverable_value: '1000',
        taxType: taxTypeId,
      });

      await request(app.getHttpServer())
        .post('/claims')
        .send({
          title: 'Claim',
          summary: 'Summary for claim 1',
          recoverable_period: '12 months',
          recoverable_value: '1000',
          taxType: taxTypeId,
        })
        .expect(400);
    });

    it('should return 400 if relatedQuestions contains invalid ObjectId', async () => {
      await request(app.getHttpServer())
        .post('/claims')
        .send({
          title: 'Claim',
          summary: 'Summary for claim 1',
          recoverable_period: '12 months',
          recoverable_value: '1000',
          relatedQuestions: 'invalidObjectId',
          taxType: taxTypeId,
        })
        .expect(400);
    });

    it('should return 201 if relatedQuestions contains valid ObjectId', async () => {
      await request(app.getHttpServer())
        .post('/claims')
        .send({
          title: 'Claim',
          objective: 'Objective for claim',
          summary: 'Summary for claim',
          recoverable_period: '12 months',
          recoverable_value: '1000',
          relatedQuestion: existingQuestionIdActive,
          taxType: taxTypeId,
        })
        .expect(201);
    });

    it('should return 400 if relatedQuestion is not active', async () => {
      await request(app.getHttpServer())
        .post('/claims')
        .send({
          title: 'Claim',
          objective: 'Objective for claim',
          summary: 'Summary for claim',
          recoverable_period: '12 months',
          recoverable_value: '1000',
          relatedQuestion: existingQuestionIdActive,
        })
        .expect(400);
    });

    it('should return 400 if invalid taxType is provided', async () => {
      await request(app.getHttpServer())
        .post('/claims')
        .send({
          title: 'Claim',
          objective: 'Objective for claim',
          summary: 'Summary for claim',
          recoverable_period: '12 months',
          recoverable_value: '1000',
          taxType: 'invalidObjectId',
        })
        .expect(400);
    });
  });

  describe('/claims (GET)', () => {
    let taxTypeId: string;

    beforeEach(async () => {
      await clearDatabase();
      const response = await request(app.getHttpServer()).post('/tax-types').send({
        name: 'any_name',
      });

      taxTypeId = response.body._id;
    });

    it('should return an empty array when no claims exist', async () => {
      const res = await request(app.getHttpServer()).get('/claims').expect(200);
      expect(res.body).toEqual([]);
    });

    it('should return all claims', async () => {
      await request(app.getHttpServer())
        .post('/claims')
        .send({
          title: 'Claim 1',
          objective: 'Objective for claim 1',
          summary: 'Summary for claim 1',
          recoverable_period: '12 months',
          recoverable_value: '1000',
          taxType: taxTypeId,
        })
        .expect(201);

      await request(app.getHttpServer())
        .post('/claims')
        .send({
          title: 'Claim 2',
          objective: 'Objective for claim 2',
          summary: 'Summary for claim 2',
          recoverable_period: '12 months',
          recoverable_value: '1000',
          taxType: taxTypeId,
        })
        .expect(201);

      const res = await request(app.getHttpServer()).get('/claims').expect(200);

      expect(res.body.length).toBe(2);
      expect(res.body[0].title).toBe('Claim 1');
    });
  });

  describe('/claims/:id (GET)', () => {
    let taxTypeId: string;

    beforeEach(async () => {
      await clearDatabase();
      const response = await request(app.getHttpServer()).post('/tax-types').send({
        name: 'any_name',
      });

      taxTypeId = response.body._id;
    });

    it('should return a claim by ID', async () => {
      const createRes = await request(app.getHttpServer())
        .post('/claims')
        .send({
          title: 'Claim 1',
          objective: 'Objective for claim 1',
          summary: 'Summary for claim 1',
          recoverable_period: '12 months',
          recoverable_value: '1000',
          taxType: taxTypeId,
        })
        .expect(201);

      const claimId = createRes.body._id;

      const res = await request(app.getHttpServer()).get(`/claims/${claimId}`).expect(200);

      expect(res.body._id).toBe(claimId);
      expect(res.body.title).toBe('Claim 1');
    });

    it('should return 400 if claim does not exist', async () => {
      await request(app.getHttpServer()).get('/claims/invalid-id').expect(400);
    });
  });

  describe('/claims/:id (PATCH)', () => {
    let existingQuestionIdActive: string;
    let existingQuestionIdNotActive: string;
    let taxTypeId: string;
    let claimId: string;

    beforeEach(async () => {
      await clearDatabase();
      let response = await request(app.getHttpServer()).post('/questions').send({
        label: 'any_label',
        tooltip: 'any_tooltip',
        relatedQuestions: [],
      });

      existingQuestionIdActive = response.body._id;

      response = await request(app.getHttpServer()).post('/questions').send({
        label: 'any_label 2',
        tooltip: 'any_tooltip',
        relatedQuestions: [],
      });

      existingQuestionIdNotActive = response.body._id;

      response = await request(app.getHttpServer()).post('/tax-types').send({
        name: 'any_name',
      });

      taxTypeId = response.body._id;

      await request(app.getHttpServer()).patch(`/questions/${existingQuestionIdNotActive}`).send({
        isActive: false,
      });

      response = await request(app.getHttpServer()).post('/claims').send({
        title: 'Claim 1',
        objective: 'Objective for claim 1',
        summary: 'Summary for claim 1',
        recoverable_period: '12 months',
        recoverable_value: '1000',
        taxType: taxTypeId,
      });

      claimId = response.body._id;
    });

    it('should update a claim with valid data', async () => {
      const res = await request(app.getHttpServer())
        .patch(`/claims/${claimId}`)
        .send({
          title: 'Updated Claim 1',
          objective: 'Updated objective for claim 1',
          summary: 'Updated summary for claim 1',
          recoverable_period: '24 months',
          recoverable_value: '2000',
          relatedQuestion: null,
        })
        .expect(200);

      expect(res.body.title).toBe('Updated Claim 1');
      expect(res.body.objective).toBe('Updated objective for claim 1');
      expect(res.body.summary).toBe('Updated summary for claim 1');
      expect(res.body.recoverable_period).toBe('24 months');
      expect(res.body.recoverable_value).toBe('2000');
    });

    it('should return 400 if invalid data is provided', async () => {
      await request(app.getHttpServer())
        .patch(`/claims/${claimId}`)
        .send({
          title: '',
          summary: '',
          recoverable_period: '',
          recoverable_value: '',
          taxType: '',
        })
        .expect(400);
    });

    it('should return 400 if claim does not exist', async () => {
      await request(app.getHttpServer()).patch('/claims/invalid-id').expect(400);
    });

    it('should return 400 if relatedQuestion contains invalid ObjectId', async () => {
      await request(app.getHttpServer())
        .patch(`/claims/${claimId}`)
        .send({
          title: 'Updated Claim 1',
          summary: 'Updated summary for claim 1',
          recoverable_period: '24 months',
          recoverable_value: '2000',
          relatedQuestion: 'invalidObjectId',
          taxType: taxTypeId,
        })
        .expect(400);
    });

    it('should return 200 if relatedQuestion contains valid ObjectId', async () => {
      await request(app.getHttpServer())
        .patch(`/claims/${claimId}`)
        .send({
          title: 'Updated Claim 1',
          summary: 'Updated summary for claim 1',
          recoverable_period: '24 months',
          recoverable_value: '2000',
          relatedQuestion: existingQuestionIdActive,
        })
        .expect(200);
    });

    it('should return 400 if relatedQuestion is not active', async () => {
      await request(app.getHttpServer())
        .patch(`/claims/${claimId}`)
        .send({
          title: 'Updated Claim 1',
          summary: 'Updated summary for claim 1',
          recoverable_period: '24 months',
          recoverable_value: '2000',
          relatedQuestion: existingQuestionIdNotActive,
        })
        .expect(400);
    });

    it('should return 400 if invalid taxType is provided', async () => {
      await request(app.getHttpServer())
        .patch(`/claims/${claimId}`)
        .send({
          title: 'Updated Claim 1',
          summary: 'Updated summary for claim 1',
          recoverable_period: '24 months',
          recoverable_value: '2000',
          taxType: 'invalidObjectId',
        })
        .expect(400);
    });
  });
});
