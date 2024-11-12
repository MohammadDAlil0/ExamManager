import { Body, Controller, Delete, Param, Post, UseGuards } from '@nestjs/common';
import { ExamQuestionService } from './exam-question.service';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ExamQuestionDto } from './dto/exam-question.dto';
import { JwtGuard } from 'src/user/guard/jwt.guard';
import { RolesGuard } from 'src/user/guard/roles.guard';
import { Roles } from 'src/user/decorator/role.decorator';
import { Role } from 'src/user/user.entity';

@UseGuards(JwtGuard ,RolesGuard)
@Roles(Role.ADMIN, Role.TEACHER)
@ApiBearerAuth()
@Controller('exam-question')
export class ExamQuestionController {
    constructor(private readonly examQuestionService: ExamQuestionService) {}

    @ApiOperation({ summary: 'Add Question For An Exam' })
    @ApiResponse({ status: 201, description: 'You will get a message' })
    @Post()
    createExam(@Body() dto: ExamQuestionDto) {
        return this.examQuestionService.create(dto);
    }

    @ApiOperation({ summary: 'Remove Student From An Exam' })
    @ApiResponse({ status: 204, description: 'You will not get anything' })
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.examQuestionService.delete(id);
    }
}
