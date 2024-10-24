import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { CreateExamDto } from './dto/create-exam.dto';
import { ExamService } from './exam.service';
import { JwtGuard } from 'src/user/guard/jwt.guard';
import { RolesGuard } from 'src/user/guard/roles.guard';
import { Roles } from 'src/user/decorator/role.decorator';
import { Role } from '@prisma/client';
import { UpdateExamDto } from './dto/update-exam.dto';

@UseGuards(JwtGuard, RolesGuard)
@Roles(Role.TEACHER, Role.MANAGER)
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
    @Delete('id')
    deleteExam(@Param('id', ParseIntPipe) examId: number) {
        return this.examService.deleteExam(examId);
    }
    
}
