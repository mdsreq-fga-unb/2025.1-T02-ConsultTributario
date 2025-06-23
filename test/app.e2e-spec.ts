import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { AuthHelper, createAuthHelper, TestUser } from './auth-helper';
import { clearDatabase, startMemoryServer, stopMemoryServer } from './mongodb-memory';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

describe('AppController (e2e)', () => {
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

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .set('Authorization', `Bearer ${regularUser.accessToken}`)
      .expect(200)
      .expect('Hello World!');
  });
});
