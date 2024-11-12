import { Controller, Get, Post, Body, Patch, Param, Delete, Put, ParseIntPipe, UseGuards, HttpCode, HttpStatus, ParseUUIDPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { SignupDto } from './dto/Signup.dto';
import { LoginDto } from './dto/login.dto';
import { ChangeRoleDto } from './dto/changeRole.dto';
import { JwtGuard } from './guard/jwt.guard';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { Roles } from './decorator/role.decorator';
import { Role } from './user.entity';
import { RolesGuard } from './guard/roles.guard';
import { ChangeRoleDecorator, DeleteUserDecorators, GetAllUsersDecorators, LoginDecorators, SignupDecorators } from './decorator/appliers.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // TODO: Test Check the new decorators
  @SignupDecorators()
  signup(@Body() dto: SignupDto) {
    return this.userService.signup(dto);
  }

  @LoginDecorators()
  login(@Body() dto: LoginDto) {
    return this.userService.login(dto); 
  }

  @GetAllUsersDecorators()
  getAllUsers() {
    return this.userService.getAllUsers();
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
