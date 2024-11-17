import { Controller, Get, Post, Body, Patch, Param, Delete, Put, ParseIntPipe, UseGuards, HttpCode, HttpStatus, ParseUUIDPipe, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { SignupDto } from './dto/Signup.dto';
import { LoginDto } from './dto/login.dto';
import { ChangeRoleDto } from './dto/changeRole.dto';
import { ChangeRoleDecorator, DeleteUserDecorators, GetAllUsersDecorators, LoginDecorators, SignupDecorators } from './decorator/appliers.decorator';
import { QueryParamsDto } from '../core/global-dto/query-params.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @SignupDecorators()
  signup(@Body() dto: SignupDto) {
    return this.userService.signup(dto);
  }

  @LoginDecorators()
  login(@Body() dto: LoginDto) {
    return this.userService.login(dto); 
  }

  @GetAllUsersDecorators()
  getAllUsers(@Query() query: QueryParamsDto) {
    return this.userService.getAllUsers(query);
  }

  @ChangeRoleDecorator()
  changeRole(@Param('id', ParseUUIDPipe) userId: string, @Body() dto: ChangeRoleDto) {
    return this.userService.changeRole(userId, dto);
  }

  @DeleteUserDecorators()
  deleteUser(@Param('id', ParseUUIDPipe) userId: string) {
    return this.userService.deleteUser(userId);
  }
}
