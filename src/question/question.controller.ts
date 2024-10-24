import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { QuestionService } from './question.service';
import { UpdateQuestionDto } from './dto/update-question.dto';

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
    updateQuestion(@Param('id', ParseIntPipe) questionId: number, @Body() dto: UpdateQuestionDto) {
        return this.questionService.updateQuestion(questionId, dto);
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete('id')
    deleteQuestion(@Param('id', ParseIntPipe) questionId: number) {
        return this.questionService.deleteQuestion(questionId);
    }
}
