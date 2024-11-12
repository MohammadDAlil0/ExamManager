import { Body, Controller, Delete, Param, Post, UseGuards } from '@nestjs/common';
import { ExamStudentService } from './exam-student.service';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ExamStudentDto } from './dto/exam-student.dto';
import { JwtGuard } from 'src/user/guard/jwt.guard';
import { RolesGuard } from 'src/user/guard/roles.guard';
import { Roles } from 'src/user/decorator/role.decorator';
import { Role } from 'src/user/user.entity';

@UseGuards(JwtGuard ,RolesGuard)
@Roles(Role.ADMIN, Role.TEACHER)
@ApiBearerAuth()
@Controller('exam-student')
export class ExamStudentController {
    constructor(private readonly examStudentService: ExamStudentService) {}

    @ApiOperation({ summary: 'Add Student For An Exam' })
    @ApiResponse({ status: 201, description: 'You will get a message' })
    @Post()
    createExam(@Body() dto: ExamStudentDto) {
        return this.examStudentService.create(dto);
    }

    @ApiOperation({ summary: 'Remove Student From An Exam' })
    @ApiResponse({ status: 204, description: 'You will not get anything' })
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.examStudentService.delete(id);
    }

}
