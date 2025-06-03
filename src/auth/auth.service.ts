import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  private readonly SALT_ROUNDS = 10;

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    this.logger.debug(`Attempting to validate user with email: ${email}`);
    const user = await this.usersService.findByEmail(email);
    
    if (!user) {
      this.logger.debug('User not found');
      return null;
    }
    
    this.logger.debug('User found, comparing passwords');
    this.logger.debug(`Input password: ${pass}`);
    this.logger.debug(`Stored password hash: ${user.password}`);
    
    try {
      const isPasswordValid = await bcrypt.compare(pass, user.password);
      this.logger.debug(`Password comparison result: ${isPasswordValid}`);
      
      if (isPasswordValid) {
        const { password, ...result } = user.toObject();
        return result;
      }
    } catch (error) {
      this.logger.error(`Error comparing passwords: ${error.message}`);
    }
    
    this.logger.debug('Invalid password');
    return null;
  }

  async login(user: any) {
    this.logger.debug('Generating JWT token for user');
    const payload = { email: user.email, sub: user._id };
    
    const tempSecret = 'chave_secreta_temporaria_para_testes';
    
    try {
      const token = this.jwtService.sign(payload, { secret: tempSecret });
      this.logger.debug('JWT token generated successfully with temporary secret');
      return {
        access_token: token,
        user: { id: user._id, email: user.email, name: user.name }
      };
    } catch (error) {
      this.logger.error(`Failed to generate JWT: ${error.message}`);
      return {
        message: 'Authenticated without token (temporary)',
        user: { id: user._id, email: user.email, name: user.name }
      };
    }
  }

  async register(userData: { email: string; password: string; name: string }) {
    try {
      this.logger.debug(`Registering user with email: ${userData.email}`);
      this.logger.debug(`Original password: ${userData.password}`);
      
      const salt = await bcrypt.genSalt(this.SALT_ROUNDS);
      this.logger.debug(`Generated salt: ${salt}`);
      
      const hashedPassword = await bcrypt.hash(userData.password, salt);
      this.logger.debug(`Hashed password: ${hashedPassword}`);
      
      const verifyHash = await bcrypt.compare(userData.password, hashedPassword);
      this.logger.debug(`Hash verification result: ${verifyHash}`);
      
      if (!verifyHash) {
        throw new Error('Password hash verification failed');
      }
      
      const user = await this.usersService.create({
        ...userData,
        password: hashedPassword,
      });
      
      this.logger.debug(`User created: ${JSON.stringify(user)}`);
      const { password, ...result } = user.toObject();
      return result;
    } catch (error) {
      this.logger.error(`Registration error: ${error.message}`);
      throw error;
    }
  }
}
