import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtModule } from '@nestjs/jwt';
import { JWTStrategy } from './strategy/jwt.strategy';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guard/roles.guard';

@Module({
  imports: [JwtModule.register({})],
  controllers: [UserController],
  providers: [UserService, JWTStrategy, {
    provide: APP_GUARD,
    useClass: RolesGuard,
  }],
})
export class UserModule {}
