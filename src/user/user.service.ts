import { ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { SignupDto } from './dto/Signup.dto';
import * as argon from 'argon2';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ChangeRoleDto } from './dto/changeRole.dto';
import { AddUserExamDto } from './dto/add-user-exam.dto';
import { EXAMSTUDENT_REPOSITORY, USER_REPOSITORY } from 'src/core/constants/constants';
import { User } from './user.entity';
import { Exam } from 'src/exam/exam.entity';
import { ExamStudent } from 'src/exam-student/exam-student.entity';

@Injectable({})
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY) private userRepository: typeof User, 
    @Inject(EXAMSTUDENT_REPOSITORY) private examStudentRepository: typeof ExamStudent, 
    private jwt: JwtService, private config: ConfigService) {}

  async signup(dto: SignupDto) {
    try {
      const hash = await argon.hash(dto.password);
      const user = await this.userRepository.create<User>({
        username: dto.username,
        email: dto.email,
        hash
      });
      return this.signToken(user.id, user.email);
    }
    catch(err) {
      console.log(err);
    }
  }

  async login(dto: LoginDto) {
    const user = await this.userRepository.findOne({
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

  async signToken(userId: string, email: string): Promise<{accessToken: string}> {
    const payload = {
      sub: userId,
      email
    }
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15d',
      secret: this.config.get('JWT_SECRET')
    });
    return {
      accessToken: token
    }
  }

  async getAllUsers(): Promise<any[]> {
    const users = await this.userRepository.findAll({
      include: {
        model: Exam
      }
    });
    return users.map(({ hash, ...user }) => user);
  }

  async changeRole(userId: number, dto: ChangeRoleDto) {
    try{
      // to do

      // const user: User = await this.userRepository.update({
      //   where: {
      //     userId
      //   }
      //   set {
      //     role: dto.role
      //   }
      // });
      delete user.hash;
      return user;
    }
    catch(err) {
      if (err instanceof userRepositoryClientKnownRequestError) {
        if (err.code === 'P2025') {
          throw new NotFoundException('User not found');
         }
     }
     throw err;
    }
  }

  async deleteUser(userId: number) {
    try {
      const user: User = await this.userRepository.user.delete({
        where: { id: userId },
      });
    } catch (error) {
      if (error.code === 'P2025') { 
        throw new NotFoundException('Invalid user ID');
      }
      throw error;
    }
  }

}


