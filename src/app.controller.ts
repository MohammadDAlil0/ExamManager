import { Controller, Get, Inject, UseInterceptors, Version } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';
import { CacheInterceptor } from '@nestjs/cache-manager';

@ApiTags('app')
@Controller('app')
export class AppController {
  constructor(
    private readonly appService: AppService
  ) {}

  // @Version('1')
  // @UseInterceptors(CacheInterceptor)
  @Get()
  getHello(): any {
    return this.appService.getHello();
  }
}
