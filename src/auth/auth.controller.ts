import { Controller, Post, Body, UseGuards, Request, Get, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from '../users/users.service';
import * as crypto from 'crypto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService
  ) {}

  @Post('login')
  async login(@Body() loginDto: { email: string; password: string }) {
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(user);
  }

  @Post('register')
  async register(
    @Body() registerDto: { email: string; password: string; name: string },
  ) {
    return this.authService.register(registerDto);
  }

  @Post('test-bcrypt')
  async testBcrypt(@Body() body: { text: string }) {
    const text = body.text;
    const hash = await this.hashPassword(text);
    const isMatch = await this.verifyPassword(text, hash);
    const isMatchWithExisting = await this.verifyPassword(text, 'CXvkxnzb9wTb9Qa9sFdpCe$2b$10$');
    
    return {
      originalText: text,
      generatedHash: hash,
      isMatchWithGenerated: isMatch,
      isMatchWithExisting: isMatchWithExisting
    };
  }
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
  @Post('reset-password-emergency')
  async resetPasswordEmergency(@Body() body: { email: string; newPassword: string }) {
    const user = await this.usersService.findByEmail(body.email);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    
    const salt = 'CXvkxnzb9wTb9Qa9sFdpCe$2b$10$';
    const newPasswordHash = await this.hashPassword(body.newPassword, salt);
    
    const testVerify = await this.verifyPassword(body.newPassword, newPasswordHash);
    
    user.password = newPasswordHash;
    await user.save();
    
    return { 
      message: 'Password reset',
      email: user.email,
      passwordChanged: true,
      verificationTest: testVerify
    };
  }

  private async hashPassword(password: string, salt?: string): Promise<string> {
    if (!salt) {
      salt = crypto.randomBytes(16).toString('hex');
    }
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    return `${salt}:${hash}`;
  }

  private async verifyPassword(password: string, storedPassword: string): Promise<boolean> {
    const [salt, storedHash] = storedPassword.split(':');
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    return storedHash === hash;
  }
}