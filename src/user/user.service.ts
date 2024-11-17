import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { SignupDto } from './dto/Signup.dto';
import * as argon from 'argon2';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ChangeRoleDto } from './dto/changeRole.dto';
import { USER_REPOSITORY } from 'src/core/constants/constants';
import { User } from './user.entity';
import { Exam } from 'src/exam/exam.entity';
import { QueryParamsDto } from './dto/query-params.dto';

@Injectable({})
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY) private userRepository: typeof User, 
    private jwt: JwtService, private config: ConfigService
  ) {}

  async signup(dto: SignupDto) {
    const hash = await argon.hash(dto.password);
    const user = await this.userRepository.create<User>({
      username: dto.username,
      email: dto.email,
      hash
    });
    return this.signToken(user.id, user.email);
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
      throw new BadRequestException('Invalid Password');
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

  async getAllUsers(query: QueryParamsDto): Promise<any[]> {
    const users = await this.userRepository.findAll({
      include: {
        model: Exam,
      },
      attributes: query.fields || undefined,
      offset: query.limit * (query.page - 1) || undefined,
      limit: query.limit || undefined,
    });
    return users.map((obj) => {
      const user = obj.toJSON();
      delete user.hash;
      return user;
    })
  }

  async changeRole(userId: string, dto: ChangeRoleDto) {
    const [numberOfAffectedRows, affectedRows] = await User.update<User>(
      { role: dto.role },
      {
        where: { id: userId },
        returning: true,
      }
    );

    if (!numberOfAffectedRows) {
      throw new NotFoundException('Invalid user ID');
    }

    const user = affectedRows[0];
    delete user.hash;
    return user;
  }

  async deleteUser(userId: string) {
    const deletedCount = await this.userRepository.destroy<User>({
      where: { id: userId },
    });

    if (deletedCount === 0) {
      throw new NotFoundException('Invalid user ID');
    }
  }
}


