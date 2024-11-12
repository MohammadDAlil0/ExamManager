import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, ParseUUIDPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { QuestionService } from './question.service';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { JwtGuard } from 'src/user/guard/jwt.guard';
import { Roles } from 'src/user/decorator/role.decorator';
import { Role } from 'src/user/user.entity';
import { ApiBearerAuth } from '@nestjs/swagger';
// import { RolesGuard } from 'src/user/guard/roles.guard';
// import { Roles } from 'src/user/decorator/role.decorator';
// import { Role } from '@prisma/client';

@UseGuards(JwtGuard)
@Roles(Role.TEACHER, Role.ADMIN)
@ApiBearerAuth()
@Controller('question')
export class QuestionController {
    constructor(private questionService: QuestionService) {}

    @Post()
    createQuestion(@Body() dto: CreateQuestionDto) {
        return this.questionService.createQuestion(dto);
    }

    @Get()
    getAllQuestions() {
        return this.questionService.getAllQuestions();
    }

    @Patch(':id')
    updateQuestion(@Param('id', ParseUUIDPipe) questionId: string, @Body() dto: UpdateQuestionDto) {
        return this.questionService.updateQuestion(questionId, dto);
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    deleteQuestion(@Param('id', ParseUUIDPipe) questionId: string) {
        return this.questionService.deleteQuestion(questionId);
    }
}
