import { Body, Controller, Delete, FileTypeValidator, Get, HttpCode, HttpStatus, MaxFileSizeValidator, Param, ParseFilePipe, ParseIntPipe, Patch, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { CreateExamDto } from './dto/create-exam.dto';
import { ExamService } from './exam.service';
import { JwtGuard } from 'src/user/guard/jwt.guard';
import { UpdateExamDto } from './dto/update-exam.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { uploadOldExamDto } from './dto/upload-old-exam.dto';

@UseGuards(JwtGuard)
@Controller('exam')
export class ExamController {
    constructor(private readonly examService: ExamService) {}
    @Post()
    createExam(@Body() dto: CreateExamDto) {
        return this.examService.createExam(dto);
    }

    @Get()
    getAllExams() {
        return this.examService.getAllExams();
    }

    @Patch(':id')
    updateExam(@Param('id', ParseIntPipe) examId: number, @Body() dto: UpdateExamDto) {
        return this.examService.updateExam(examId, dto);
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    deleteExam(@Param('id', ParseIntPipe) examId: number) {
        return this.examService.deleteExam(examId);
    }

    @Post('uploadOld')
    @UseInterceptors(FileInterceptor('file'))
    uploadOldFile(
        @Body() dto: uploadOldExamDto, 
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new MaxFileSizeValidator({ maxSize: 30000000 }),
                    new FileTypeValidator({ fileType: 'application/pdf' }),
                ],
            })
        ) 
        file: Express.Multer.File) {
        return this.examService.uploadOldExam(dto, file);
    }
}
