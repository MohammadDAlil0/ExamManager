import { Body, Controller, Param } from '@nestjs/common';
import { ExamQuestionService } from './exam-question.service';
import { ExamQuestionDto } from './dto/exam-question.dto';
import { CreateExamQuestionDecorator, GlobalExamQuestionDecorator, RemoveExamQuestionDecorator } from './decotator/appliers.decorator';

GlobalExamQuestionDecorator()
@Controller('exam-question')
export class ExamQuestionController {
    constructor(private readonly examQuestionService: ExamQuestionService) {}

    @CreateExamQuestionDecorator()
    createExamQuestion(@Body() dto: ExamQuestionDto) {
        return this.examQuestionService.create(dto);
    }

    @RemoveExamQuestionDecorator()
    remove(@Param('id') id: string) {
        return this.examQuestionService.delete(id);
    }
}
