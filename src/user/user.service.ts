import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { SignupDto } from './dto/Signup.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

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
      delete user.hash;
      return user;
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

    
    const userMathPassword = await argon.verify(user.hash, dto.passowrd);

    if (!userMathPassword) {
      throw new NotFoundException('User not found!');
    }

    delete user.hash;
    return user;
  }

}
