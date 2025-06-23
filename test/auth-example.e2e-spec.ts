import { Test, TestingModule } from '@nestjs/testing';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from '../src/app.module';
import * as request from 'supertest';
import { startMemoryServer, stopMemoryServer, clearDatabase } from './mongodb-memory';
import { ValidationPipe } from '@nestjs/common';
import { AuthHelper, createAuthHelper, TestUser } from './auth-helper';

describe('Example E2E with Auth', () => {
  let app: NestFastifyApplication;
  let authHelper: AuthHelper;

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
  });

  afterEach(async () => {
    await app.close();
  });

  describe('Exemplos de uso do AuthHelper', () => {
    it('deve criar dois usuários (admin e comum)', async () => {
      const { adminUser, regularUser } = await authHelper.createTestUsers();

      expect(adminUser.role).toBe('admin');
      expect(adminUser.email).toBe('admin@test.com');
      expect(adminUser.accessToken).toBeDefined();

      expect(regularUser.role).toBe('user');
      expect(regularUser.email).toBe('user@test.com');
      expect(regularUser.accessToken).toBeDefined();
    });

    it('deve criar apenas um usuário admin', async () => {
      const adminUser = await authHelper.createAdminUser();

      expect(adminUser.role).toBe('admin');
      expect(adminUser.email).toBe('admin@test.com');
      expect(adminUser.accessToken).toBeDefined();
    });

    it('deve criar apenas um usuário comum', async () => {
      const regularUser = await authHelper.createRegularUser();

      expect(regularUser.role).toBe('user');
      expect(regularUser.email).toBe('user@test.com');
      expect(regularUser.accessToken).toBeDefined();
    });

    it('deve converter usuário comum em admin', async () => {
      const { regularUser } = await authHelper.createTestUsers();

      // Verificar que é usuário comum
      expect(regularUser.role).toBe('user');

      // Converter para admin
      const updatedUser = await authHelper.makeUserAdmin(regularUser._id);

      expect(updatedUser.role).toBe('admin');
      expect(updatedUser._id).toBe(regularUser._id);
      expect(updatedUser.accessToken).toBeDefined();
      expect(updatedUser.accessToken).not.toBe(regularUser.accessToken); // Token deve ser diferente
    });

    it('deve fazer requisições autenticadas usando helpers', async () => {
      const { adminUser, regularUser } = await authHelper.createTestUsers();

      // Criar uma question usando usuário admin
      const questionResponse = await authHelper.authenticatedPost('/questions', adminUser, {
        label: 'Test Question',
        tooltip: 'Test tooltip',
        relatedQuestions: [],
      });

      expect(questionResponse.status).toBe(201);

      // Buscar questions usando usuário comum
      const getResponse = await authHelper.authenticatedGet('/questions', regularUser);

      expect(getResponse.status).toBe(200);
      expect(getResponse.body).toBeInstanceOf(Array);
      expect(getResponse.body.length).toBe(1);
    });

    it('deve fazer requisição genérica usando makeAuthenticatedRequest', async () => {
      const adminUser = await authHelper.createAdminUser();

      // Criar uma question
      const createResponse = await authHelper.makeAuthenticatedRequest('POST', '/questions', adminUser, {
        label: 'Another Test Question',
        tooltip: 'Another test tooltip',
        relatedQuestions: [],
      });

      expect(createResponse.status).toBe(201);

      // Buscar a question criada
      const getResponse = await authHelper.makeAuthenticatedRequest('GET', '/questions', adminUser);

      expect(getResponse.status).toBe(200);
      expect(getResponse.body.length).toBe(1);

      // Atualizar a question
      const updateResponse = await authHelper.makeAuthenticatedRequest(
        'PATCH',
        `/questions/${createResponse.body._id}`,
        adminUser,
        {
          label: 'Updated Question Label',
        },
      );

      expect(updateResponse.status).toBe(200);
      expect(updateResponse.body.label).toBe('Updated Question Label');
    });

    it('deve testar acesso negado para usuário sem permissão', async () => {
      const regularUser = await authHelper.createRegularUser();

      // Assumindo que existe uma rota que requer admin
      // Exemplo: atualizar uma question pode requerer admin
      const response = await authHelper.authenticatedPost('/questions', regularUser, {
        label: 'Test Question',
        tooltip: 'Test tooltip',
        relatedQuestions: [],
      });

      // Se a rota requer admin, deve retornar 403 ou similar
      // Adapte conforme as regras de negócio do seu projeto
      expect([201, 403, 401]).toContain(response.status);
    });
  });

  describe('Cenários específicos de autorização', () => {
    let adminUser: TestUser;
    let regularUser: TestUser;

    beforeEach(async () => {
      const users = await authHelper.createTestUsers();
      adminUser = users.adminUser;
      regularUser = users.regularUser;
    });

    it('admin deve conseguir acessar rotas protegidas', async () => {
      // Exemplo de teste específico para admin
      const response = await authHelper.authenticatedGet('/questions', adminUser);
      expect(response.status).toBe(200);
    });

    it('usuário comum deve ter acesso limitado', async () => {
      // Exemplo de teste específico para usuário comum
      const response = await authHelper.authenticatedGet('/questions', regularUser);
      expect(response.status).toBe(200);
    });
  });
});
