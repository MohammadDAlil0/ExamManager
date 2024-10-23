import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { SignupDto } from './dto/Signup.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ChangeRoleDto } from './dto/changeRole.dto';
import { User } from '@prisma/client';
import { IUser } from './entities/user.entity';

@Injectable({})
export class UserService {
  constructor(private prisma: PrismaService, private jwt: JwtService, private config: ConfigService) {}

  async signup(dto: SignupDto) {
    try {
      const hash = await argon.hash(dto.password);
      const user = await this.prisma.user.create({
        data: {
          username: dto.username,
          email: dto.email,
          hash
        }
      });
      return this.signToken(user.id, user.email);
    }
    catch(err) {
      if (err instanceof PrismaClientKnownRequestError) {
         if (err.code === 'P2002') {
            throw new ForbiddenException('Credentials taken');
          }
      }
      throw err;
    }
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email
      }
    });

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    
    const userMathPassword = await argon.verify(user.hash, dto.password);

    if (!userMathPassword) {
      throw new NotFoundException('Invalid Password');
    }

    return this.signToken(user.id, user.email);
  }

  async signToken(userId: number, email: string): Promise<{accessToken: string}> {
    const payload = {
      sub: userId,
      email
    }
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: this.config.get('JWT_SECRET')
    });
    return {
      accessToken: token
    }
  }

  async getAllUsers(): Promise<IUser[]> {
    const users = await this.prisma.user.findMany();
    return users.map(({ hash, ...user }) => user);
  }

  async changeRole(userId: number, dto: ChangeRoleDto) {
    const user: User = await this.prisma.user.update({
      where: {
        id: userId
      },
      data: {
        role: dto.role
      }
    });
    delete user.hash;
    return user;
  }

}


