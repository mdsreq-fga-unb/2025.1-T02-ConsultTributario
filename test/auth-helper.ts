import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { getModelToken } from '@nestjs/mongoose';
import { User, UserRole } from '../src/users/schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as request from 'supertest';

export interface TestUser {
  _id: string;
  email: string;
  password: string;
  role: UserRole;
  accessToken: string;
}

export class AuthHelper {
  private app: NestFastifyApplication;
  private userModel: Model<User>;

  constructor(app: NestFastifyApplication) {
    this.app = app;
    this.userModel = app.get(getModelToken(User.name));
  }

  /**
   * Cria dois usuários para teste: um admin e um usuário comum
   * @returns Promise com os dois usuários criados
   */
  async createTestUsers(): Promise<{ adminUser: TestUser; regularUser: TestUser }> {
    // Limpar usuários existentes
    await this.userModel.deleteMany({});

    // Criar usuário comum
    const regularUserData = {
      email: 'user@test.com',
      password: await bcrypt.hash('password123', 12),
      role: UserRole.USER,
    };

    const regularUserDoc = await this.userModel.create(regularUserData);

    // Criar usuário admin
    const adminUserData = {
      email: 'admin@test.com',
      password: await bcrypt.hash('password123', 12),
      role: UserRole.ADMIN,
    };

    const adminUserDoc = await this.userModel.create(adminUserData);

    // Fazer login para obter tokens
    const regularUserLogin = await request(this.app.getHttpServer()).post('/auth/login').send({
      email: 'user@test.com',
      password: 'password123',
    });

    const adminUserLogin = await request(this.app.getHttpServer()).post('/auth/login').send({
      email: 'admin@test.com',
      password: 'password123',
    });

    const regularUser: TestUser = {
      _id: regularUserDoc._id.toString(),
      email: regularUserDoc.email,
      password: 'password123',
      role: regularUserDoc.role,
      accessToken: regularUserLogin.body.access_token,
    };

    const adminUser: TestUser = {
      _id: adminUserDoc._id.toString(),
      email: adminUserDoc.email,
      password: 'password123',
      role: adminUserDoc.role,
      accessToken: adminUserLogin.body.access_token,
    };

    return { adminUser, regularUser };
  }

  /**
   * Cria apenas um usuário admin para testes
   * @returns Promise com o usuário admin criado
   */
  async createAdminUser(): Promise<TestUser> {
    const { adminUser } = await this.createTestUsers();
    return adminUser;
  }

  /**
   * Cria apenas um usuário comum para testes
   * @returns Promise com o usuário comum criado
   */
  async createRegularUser(): Promise<TestUser> {
    const { regularUser } = await this.createTestUsers();
    return regularUser;
  }

  /**
   * Converte um usuário comum em admin (altera diretamente no banco)
   * @param userId ID do usuário para tornar admin
   * @returns Promise com o usuário atualizado
   */
  async makeUserAdmin(userId: string): Promise<TestUser> {
    const updatedUser = await this.userModel.findByIdAndUpdate(userId, { role: UserRole.ADMIN }, { new: true });

    if (!updatedUser) {
      throw new Error('Usuário não encontrado');
    }

    // Fazer novo login para obter token atualizado
    const loginResponse = await request(this.app.getHttpServer()).post('/auth/login').send({
      email: updatedUser.email,
      password: 'password123', // Assumindo que a senha padrão é esta
    });

    return {
      _id: updatedUser._id.toString(),
      email: updatedUser.email,
      password: 'password123',
      role: updatedUser.role,
      accessToken: loginResponse.body.access_token,
    };
  }

  /**
   * Limpa todos os usuários do banco de dados
   */
  async clearUsers(): Promise<void> {
    await this.userModel.deleteMany({});
  }
  /**
   * Helper para fazer requisições autenticadas
   * @param method Método HTTP (GET, POST, PATCH, DELETE)
   * @param url URL da requisição
   * @param user Usuário para autenticação
   * @param body Corpo da requisição (opcional)
   * @returns Promise com a resposta da requisição
   */
  async makeAuthenticatedRequest(method: 'GET' | 'POST' | 'PATCH' | 'DELETE', url: string, user: TestUser, body?: any) {
    let req;

    switch (method) {
      case 'GET':
        req = request(this.app.getHttpServer()).get(url);
        break;
      case 'POST':
        req = request(this.app.getHttpServer()).post(url);
        break;
      case 'PATCH':
        req = request(this.app.getHttpServer()).patch(url);
        break;
      case 'DELETE':
        req = request(this.app.getHttpServer()).delete(url);
        break;
      default:
        throw new Error(`Método HTTP não suportado: ${method}`);
    }

    req.set('Authorization', `Bearer ${user.accessToken}`);

    if (body && (method === 'POST' || method === 'PATCH')) {
      req.send(body);
    }

    return req;
  }

  /**
   * Helper para fazer requisições GET autenticadas
   */
  async authenticatedGet(url: string, user: TestUser) {
    return this.makeAuthenticatedRequest('GET', url, user);
  }

  /**
   * Helper para fazer requisições POST autenticadas
   */
  async authenticatedPost(url: string, user: TestUser, body: any) {
    return this.makeAuthenticatedRequest('POST', url, user, body);
  }

  /**
   * Helper para fazer requisições PATCH autenticadas
   */
  async authenticatedPatch(url: string, user: TestUser, body: any) {
    return this.makeAuthenticatedRequest('PATCH', url, user, body);
  }

  /**
   * Helper para fazer requisições DELETE autenticadas
   */
  async authenticatedDelete(url: string, user: TestUser) {
    return this.makeAuthenticatedRequest('DELETE', url, user);
  }
}

/**
 * Factory function para criar uma instância do AuthHelper
 * @param app Instância da aplicação NestJS
 * @returns Nova instância do AuthHelper
 */
export const createAuthHelper = (app: NestFastifyApplication): AuthHelper => {
  return new AuthHelper(app);
};
