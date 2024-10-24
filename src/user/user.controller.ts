import { Controller, Get, Post, Body, Patch, Param, Delete, Put, ParseIntPipe, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { SignupDto } from './dto/Signup.dto';
import { LoginDto } from './dto/login.dto';
import { ChangeRoleDto } from './dto/changeRole.dto';
import { JwtGuard } from './guard/jwt.guard';
import { Roles } from './decorator/role.decorator';
import { Role } from '@prisma/client';
import { RolesGuard } from './guard/roles.guard';
import { GetUser } from './decorator/get-user.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  signup(@Body() dto: SignupDto) {
    return this.userService.signup(dto);
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.userService.login(dto); 
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.MANAGER, Role.TEACHER)
  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.MANAGER)
  @Put('changeRole/:userId')
  changeRole(@Param('userId', ParseIntPipe) userId: number, @Body() dto: ChangeRoleDto) {
    return this.userService.changeRole(userId, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Roles(Role.MANAGER)
  @Delete('id')
  deleteUser(@Param('id', ParseIntPipe) userId: number) {
    return this.userService.deleteUser(userId);
  }

}
