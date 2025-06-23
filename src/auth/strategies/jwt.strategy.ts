import { ERROR_MESSAGES } from '@/common/constants/app.constants';
import { UsersService } from '@/users/users.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export interface JwtPayload {
  sub: string;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey:
        configService.get<string>('JWT_SECRET') ||
        (() => {
          throw new Error('JWT_SECRET is required');
        })(),
    });
  }

  async validate(payload: JwtPayload) {
    if (!payload.sub || !payload.email || !payload.role) {
      throw new UnauthorizedException(ERROR_MESSAGES.INVALID_TOKEN);
    }

    return {
      id: payload.sub,
      email: payload.email,
      role: payload.role,
    };

    // const user = await this.usersService.findByEmail(payload.email);

    // if (!user) {
    //   throw new Error(ERROR_MESSAGES.USER_NOT_FOUND);
    // }

    // if (user.id !== payload.sub) {
    //   throw new UnauthorizedException(ERROR_MESSAGES.INVALID_TOKEN);
    // }

    // return {
    //   id: user.id,
    //   email: user.email,
    //   role: user.role,
    // };
  }
}
