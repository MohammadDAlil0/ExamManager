import { Body, Controller, Post } from '@nestjs/common';
import { ExamStudentService } from './exam-student.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ExamStudentDto } from './dto/exam-student.dto';

@Controller('exam-student')
export class ExamStudentController {
    constructor(private readonly examStudentService: ExamStudentService) {}

    @ApiOperation({ summary: 'Add Student for an exam' })
    @ApiResponse({ status: 201, description: 'You will get a message' })
    @Post()
    createExam(@Body() dto: ExamStudentDto) {
        return this.examStudentService.create(dto);
    }


    

}
