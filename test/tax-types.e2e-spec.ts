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

  describe('/tax-types (POST)', () => {
    let taxTypeId: string;

    beforeEach(async () => {
      await clearDatabase();
      const res = await request(app.getHttpServer()).post('/tax-types').send({ name: 'any_name' }).expect(201);
      taxTypeId = res.body._id;
    });

    it('should create a new tax type with valid data', async () => {
      const createTaxTypeDto = { name: 'valid_name' };
      const res = await request(app.getHttpServer()).post('/tax-types').send(createTaxTypeDto).expect(201);

      expect(res.body).toHaveProperty('_id');
      expect(res.body.name).toBe(createTaxTypeDto.name);
    });

    it('should return 400 for invalid data', async () => {
      const createTaxTypeDto = { name: '' };
      await request(app.getHttpServer()).post('/tax-types').send(createTaxTypeDto).expect(400);
    });

    it('should return 400 for duplicate tax name', async () => {
      const createTaxTypeDto = { name: 'any_name' };
      await request(app.getHttpServer()).post('/tax-types').send(createTaxTypeDto).expect(400);
    });
  });

  describe('/tax-types (GET)', () => {
    it('should return an array of tax types', async () => {
      const res = await request(app.getHttpServer()).get('/tax-types').expect(200);
      expect(res.body).toBeInstanceOf(Array);
    });
  });

  describe('/tax-types/:id (PATCH)', () => {
    it('should update a tax type with valid data', async () => {
      const createTaxTypeDto = { name: 'valid_name' };
      const createRes = await request(app.getHttpServer()).post('/tax-types').send(createTaxTypeDto).expect(201);
      const taxTypeId = createRes.body._id;

      const updatedTaxTypeDto = { name: 'updated_name' };
      const res = await request(app.getHttpServer())
        .patch(`/tax-types/${taxTypeId}`)
        .send(updatedTaxTypeDto)
        .expect(200);

      expect(res.body).toHaveProperty('_id', taxTypeId);
      expect(res.body.name).toBe(updatedTaxTypeDto.name);
    });

    it('should return 400 if invalid update data is provided', async () => {
      const createTaxTypeDto = { name: 'valid_name' };
      const createRes = await request(app.getHttpServer()).post('/tax-types').send(createTaxTypeDto).expect(201);
      const taxTypeId = createRes.body._id;

      const updatedTaxTypeDto = { name: '' };
      await request(app.getHttpServer()).patch(`/tax-types/${taxTypeId}`).send(updatedTaxTypeDto).expect(400);
    });

    it('should return 404 if tax type does not exist', async () => {
      const nonExistentId = '507f1f77bcf86cd799439011';
      const updatedTaxTypeDto = { name: 'updated_name' };
      await request(app.getHttpServer()).patch(`/tax-types/${nonExistentId}`).send(updatedTaxTypeDto).expect(404);
    });

    it('should return 400 if trying to update to a duplicate tax type name', async () => {
      const createTaxTypeDto = { name: 'name1' };
      const createRes = await request(app.getHttpServer()).post('/tax-types').send(createTaxTypeDto).expect(201);
      const taxTypeId = createRes.body._id;

      const updatedTaxTypeDto = { name: 'name1' };
      await request(app.getHttpServer()).patch(`/tax-types/${taxTypeId}`).send(updatedTaxTypeDto).expect(400);
    });
  });
});
