import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtModule } from '@nestjs/jwt';
import { JWTStrategy } from './strategy/jwt.strategy';
import { userProviders } from './user.provider';

@Module({
  imports: [JwtModule.register({})],
  controllers: [UserController],
  providers: [UserService, JWTStrategy, ...userProviders],
})
export class UserModule {}