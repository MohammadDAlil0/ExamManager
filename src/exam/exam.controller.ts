import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateExamDto } from './dto/create-exam.dto';
import { ExamService } from './exam.service';

@Controller('exam')
export class ExamController {
    constructor(private readonly examService: ExamService) {}

    @Post()
    createExam(@Body() dto: CreateExamDto) {
        dto.date = new Date(dto.date);
        return this.examService.createExam(dto);
    }

    @Get()
    getAllExams() {
        return this.examService.getAllExams();
    }

}
