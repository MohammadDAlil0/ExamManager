import { Controller, Get, Post, Body, Patch, Param, Delete, Put, ParseIntPipe, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { SignupDto } from './dto/Signup.dto';
import { LoginDto } from './dto/login.dto';
import { ChangeRoleDto } from './dto/changeRole.dto';
import { JwtGuard } from './guard/jwt.guard';
import { Roles } from './decorator/role.decorator';
import { Role } from '@prisma/client';

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

  @UseGuards(JwtGuard)
  @Roles(Role.MANAGER, Role.TEACHER)
  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }


  @Put('changeRole/:userId')
  changeRole(@Param('userId', ParseIntPipe) userId: number, @Body() dto: ChangeRoleDto) {
    return this.userService.changeRole(userId, dto);
  }
}
