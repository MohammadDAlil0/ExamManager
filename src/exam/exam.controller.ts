import { Body, Controller, Delete, FileTypeValidator, Get, HttpCode, HttpStatus, MaxFileSizeValidator, Param, ParseFilePipe, ParseIntPipe, ParseUUIDPipe, Patch, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { CreateExamDto } from './dto/create-exam.dto';
import { ExamService } from './exam.service';
import { UpdateExamDto } from './dto/update-exam.dto';
import { CreateExamDecorator, DeleteExamDecorator, GetAllExamsDecorator, GlobalExamDecorator, UpdateExamDecorator } from './decorator/appliers.decorator';

@GlobalExamDecorator()
@Controller('exam')
export class ExamController {
    constructor(private readonly examService: ExamService) {}

    @CreateExamDecorator()
    createExam(@Body() dto: CreateExamDto) {
        return this.examService.createExam(dto);
    }

    @GetAllExamsDecorator()
    getAllExams() {
        return this.examService.getAllExams();
    }

    @UpdateExamDecorator()
    updateExam(@Param('id', ParseUUIDPipe) examId: string, @Body() dto: UpdateExamDto) {
        return this.examService.updateExam(examId, dto);
    }

    @DeleteExamDecorator()
    deleteExam(@Param('id', ParseUUIDPipe) examId: string) {
        return this.examService.deleteExam(examId);
    }
}
