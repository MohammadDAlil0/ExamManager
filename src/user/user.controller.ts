import { Controller, Get, Post, Body, Patch, Param, Delete, Put, ParseIntPipe, UseGuards, HttpCode, HttpStatus, ParseUUIDPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { SignupDto } from './dto/Signup.dto';
import { LoginDto } from './dto/login.dto';
import { ChangeRoleDto } from './dto/changeRole.dto';
import { JwtGuard } from './guard/jwt.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Roles } from './decorator/role.decorator';
import { Role } from './user.entity';
import { RolesGuard } from './guard/roles.guard';
// import { Roles } from './decorator/role.decorator';
// import { Role } from '@prisma/client';
// import { RolesGuard } from './guard/roles.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Signup A User' })
  @ApiResponse({ status: 201, description: 'You will get an access token' })
  @Post('signup')
  signup(@Body() dto: SignupDto) {
    return this.userService.signup(dto);
  }

  @ApiOperation({ summary: 'Login A User' })
  @ApiResponse({ status: 201, description: 'You will get an access token' })
  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.userService.login(dto); 
  }

  @ApiOperation({ summary: 'Get All Users' })
  @ApiResponse({ status: 200, description: 'You will get a list of users' })
  @ApiBearerAuth() 
  @UseGuards(JwtGuard)
  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @ApiOperation({ summary: "Change A User's Role" })
  @ApiResponse({ status: 200, description: 'You will get the updated user' })
  @ApiBearerAuth()
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Put('changeRole/:id')
  changeRole(@Param('id', ParseUUIDPipe) userId: string, @Body() dto: ChangeRoleDto) {
    return this.userService.changeRole(userId, dto);
  }

  @ApiOperation({ summary: 'Delete A User' })
  @ApiResponse({ status: 204, description: 'You will not get any response' })
  @ApiBearerAuth()
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) userId: string) {
    return this.userService.deleteUser(userId);
  }

}
