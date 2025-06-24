import { Test, TestingModule } from '@nestjs/testing';
import { ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { AuthHelper, createAuthHelper, TestUser } from './auth-helper';
import { clearDatabase, startMemoryServer, stopMemoryServer } from './mongodb-memory';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

describe('AuthController (e2e)', () => {
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

  it('/auth/register (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        email: 'any_email@gmail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      })
      .expect(201);

    const { access_token } = response.body;

    await request(app.getHttpServer()).get('/tax-types').set('Authorization', `Bearer ${access_token}`).expect(200);
  });

  it('/auth/login (POST)', async () => {
    await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        email: 'any_email@gmail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      })
      .expect(201);

    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'any_email@gmail.com',
        password: 'any_password',
      })
      .expect(201);

    const { access_token } = response.body;

    await request(app.getHttpServer()).get('/tax-types').set('Authorization', `Bearer ${access_token}`).expect(200);
  });
});
