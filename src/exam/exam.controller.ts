import { Body, Controller, Delete, FileTypeValidator, Get, HttpCode, HttpStatus, MaxFileSizeValidator, Param, ParseFilePipe, ParseIntPipe, ParseUUIDPipe, Patch, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { CreateExamDto } from './dto/create-exam.dto';
import { ExamService } from './exam.service';
import { JwtGuard } from 'src/user/guard/jwt.guard';
import { UpdateExamDto } from './dto/update-exam.dto';
import { RolesGuard } from 'src/user/guard/roles.guard';
import { Roles } from 'src/user/decorator/role.decorator';
import { Role } from 'src/user/user.entity';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@UseGuards(JwtGuard, RolesGuard)
@Roles(Role.ADMIN, Role.TEACHER)
@ApiBearerAuth() 
@Controller('exam')
export class ExamController {
    constructor(private readonly examService: ExamService) {}

    @ApiOperation({ summary: 'Create Exam' })
    @ApiResponse({ status: 201, description: 'You will get the created exam' })
    @Post()
    createExam(@Body() dto: CreateExamDto) {
        return this.examService.createExam(dto);
    }

    @ApiOperation({ summary: 'Get All Exams' })
    @ApiResponse({ status: 201, description: 'You will get all the exams' })
    @Get()
    getAllExams() {
        return this.examService.getAllExams();
    }

    @ApiOperation({ summary: 'Update Exam' })
    @ApiResponse({ status: 201, description: 'You will get the updated exam' })
    @Patch(':id')
    updateExam(@Param('id', ParseUUIDPipe) examId: string, @Body() dto: UpdateExamDto) {
        return this.examService.updateExam(examId, dto);
    }

    @ApiOperation({ summary: 'Delete Exam' })
    @ApiResponse({ status: 201, description: 'You will not get anything' })
    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    deleteExam(@Param('id', ParseUUIDPipe) examId: string) {
        return this.examService.deleteExam(examId);
    }
}
