import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import * as bcrypt from 'bcrypt'
import { User } from 'src/users/entities/user.entity';
import { UserPayload } from './models/UserPayload';
import { JwtService } from '@nestjs/jwt';
import { UserToken } from './models/UserToken';

@Injectable()
export class AuthService {

    constructor(private readonly userService: UsersService, private readonly jwtService: JwtService) {}

    login(user: User): UserToken {
        // Transforma o user em um JWT
        const payload: UserPayload = {
            sub: user.id ?? 0, // Provide a default value or handle undefined appropriately
            email: user.email,
            name: user.name,
        };

        const jwtToken = this.jwtService.sign(payload);

        return {
            access_token: jwtToken,
        };

    }

    async validateUser(email: string, password: string) {
        const user = await this.userService.findByEmail(email);

        if (user) {
            // Checar se a senha informada corresponde à hash do banco
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (isPasswordValid) {
                return {
                    ...user,
                    password: undefined,
                };
            }
        }

        // Se chegar aqui, significa que nao encontrou um user e/ou a senha não corresponde
        throw new Error('Email address or password provided is incorrect.')
    }

    async register(createUserDto: CreateUserDto) {
        const user = await this.userService.create(createUserDto);
        return user;
    }
}
