import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let service: AuthService;
  let usersService: Partial<UsersService>;
  let jwtService: Partial<JwtService>;

  const mockUser = {
    id: 1,
    email: 'test@example.com',
    name: 'Test User',
    password: 'hashedPassword',
  };

  beforeEach(async () => {
    usersService = {
      findByEmail: jest.fn(),
      create: jest.fn(),
    };

    jwtService = {
      sign: jest.fn().mockReturnValue('mocked-jwt-token'),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: usersService },
        { provide: JwtService, useValue: jwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('login', () => {
    it('should return an access token for valid user', () => {
      const result = service.login(mockUser as any);
      expect(result).toEqual({ access_token: 'mocked-jwt-token' });
      expect(jwtService.sign).toHaveBeenCalledWith({
        sub: mockUser.id,
        email: mockUser.email,
        name: mockUser.name,
      });
    });
  });

  describe('validateUser', () => {
    it('should return user data without password if credentials are valid', async () => {
      (usersService.findByEmail as jest.Mock).mockResolvedValue(mockUser);
      jest.spyOn(bcrypt, 'compare' as any).mockResolvedValue(true);

      const result = await service.validateUser(mockUser.email, 'password123');
      expect(result).toEqual({
        ...mockUser,
        password: undefined,
      });
      expect(usersService.findByEmail).toHaveBeenCalledWith(mockUser.email);
      expect(bcrypt.compare).toHaveBeenCalledWith('password123', mockUser.password);
    });

    it('should throw error if user not found', async () => {
      (usersService.findByEmail as jest.Mock).mockResolvedValue(null);

      await expect(service.validateUser('unknown@example.com', 'password')).rejects.toThrow(
        'Email address or password provided is incorrect.',
      );
    });

    it('should throw error if password is invalid', async () => {
      (usersService.findByEmail as jest.Mock).mockResolvedValue(mockUser);
      jest.spyOn(bcrypt, 'compare' as any).mockResolvedValue(false);

      await expect(service.validateUser(mockUser.email, 'wrongpassword')).rejects.toThrow(
        'Email address or password provided is incorrect.',
      );
    });
  });

  describe('register', () => {
    it('should create and return a user', async () => {
      const createUserDto = { email: 'new@example.com', password: 'pass', name: 'New User' };
      (usersService.create as jest.Mock).mockResolvedValue({ id: 2, ...createUserDto });

      const result = await service.register(createUserDto);
      expect(result).toEqual({ id: 2, ...createUserDto });
      expect(usersService.create).toHaveBeenCalledWith(createUserDto);
    });
  });
});
