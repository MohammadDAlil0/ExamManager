import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtModule } from '@nestjs/jwt';
import { JWTStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [JwtModule.register({})],
  controllers: [UserController],
  providers: [UserService, JWTStrategy],
})
export class UserModule {}
