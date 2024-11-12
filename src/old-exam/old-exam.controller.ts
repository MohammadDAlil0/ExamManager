import { Controller, Get, Post, Body, Param, Delete, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator, UseGuards } from '@nestjs/common';
import { OldExamService } from './old-exam.service';
import { ApiBody, ApiConsumes, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { createOldExamDto } from './dto/create-old-exam.dto';
import { RolesGuard } from 'src/user/guard/roles.guard';
import { JwtGuard } from 'src/user/guard/jwt.guard';
import { Roles } from 'src/user/decorator/role.decorator';
import { Role } from 'src/user/user.entity';

@UseGuards(JwtGuard ,RolesGuard)
@Roles(Role.ADMIN, Role.TEACHER)
@Controller('old-exam')
export class OldExamController {
  constructor(private readonly oldExamService: OldExamService) {}

  @ApiOperation({ summary: 'Upload Old Exam' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ status: 201, description: 'You will get a message' })
  @ApiBody({
      schema: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          date: { type: 'string', format: 'date' },
          file: {
            type: 'string',
            description: 'Exam File',
            format: 'binary',
          },
        },
      },
  })
  @Post('create')
  @UseInterceptors(FileInterceptor('file'))
  uploadOldFile(
      @Body() dto: createOldExamDto,
      @UploadedFile(
          new ParseFilePipe({
              validators: [
                  new MaxFileSizeValidator({ maxSize: 30000000 }),
                  new FileTypeValidator({ fileType: 'application/pdf' }),
              ],
          })
      )
      file: Express.Multer.File,
  ) {
      return this.oldExamService.createOldExam(dto, file);
  }

  @ApiOperation({ summary: 'Get All Old Exams' })
  @ApiResponse({ status: 201, description: 'You will get all the old exams' })
  @Get()
  findAll() {
    return this.oldExamService.findAllOldExams();
  }

  @ApiOperation({ summary: 'Delete Old Exam' })
  @ApiResponse({ status: 201, description: 'You will not get anything' })
  @Delete(':id')
  remove(@Param('id') examId: string) {
    return this.oldExamService.deleteoldExam(examId);
  }
}
