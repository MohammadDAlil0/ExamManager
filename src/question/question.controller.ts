import { Body, Controller, Param, ParseUUIDPipe } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { QuestionService } from './question.service';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { CreateQuestionDecorator, DeleteQuestionDecorator, GetAllQuestionsDecorator, GlobalQuestionDecorator, UpdateQuestionDecorator } from './decorator/appliers.decorator';

@GlobalQuestionDecorator()
@Controller('question')
export class QuestionController {
    constructor(private questionService: QuestionService) {}

    @CreateQuestionDecorator()
    createQuestion(@Body() dto: CreateQuestionDto) {
        return this.questionService.createQuestion(dto);
    }

    @GetAllQuestionsDecorator()
    getAllQuestions() {
        return this.questionService.getAllQuestions();
    }

    @UpdateQuestionDecorator()
    updateQuestion(@Param('id', ParseUUIDPipe) questionId: string, @Body() dto: UpdateQuestionDto) {
        return this.questionService.updateQuestion(questionId, dto);
    }

    @DeleteQuestionDecorator()
    deleteQuestion(@Param('id', ParseUUIDPipe) questionId: string) {
        return this.questionService.deleteQuestion(questionId);
    }
}
