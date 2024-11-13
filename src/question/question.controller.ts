import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { QuestionService } from './question.service';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { GlobalQuestionDecorator } from './decorator/appliers.decorator';

@GlobalQuestionDecorator()
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
