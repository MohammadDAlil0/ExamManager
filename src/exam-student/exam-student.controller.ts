import { Body, Controller, Delete, Param, Post, UseGuards } from '@nestjs/common';
import { ExamStudentService } from './exam-student.service';
import { ExamStudentDto } from './dto/exam-student.dto';
import { CreateExamStudentDecorator, GlobalExamStudentDecorator, RemoveExamStudentDecorator } from './decorator/appliers.decorator';

@GlobalExamStudentDecorator()
@Controller('exam-student')
export class ExamStudentController {
    constructor(private readonly examStudentService: ExamStudentService) {}

    @CreateExamStudentDecorator()
    createExam(@Body() dto: ExamStudentDto) {
        return this.examStudentService.create(dto);
    }

    @RemoveExamStudentDecorator()
    remove(@Param('id') id: string) {
        return this.examStudentService.delete(id);
    }
}
