import { Module } from '@nestjs/common';
import { ExamQuestionController } from './exam-question.controller';
import { ExamQuestionService } from './exam-question.service';
import { examQuestionProviders } from './exam-question.provider';

@Module({
  controllers: [ExamQuestionController],
  providers: [ExamQuestionService, ...examQuestionProviders]
})
export class ExamQuestionModule {}
