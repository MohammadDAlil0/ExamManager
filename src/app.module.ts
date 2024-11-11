import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { ExamModule } from './exam/exam.module';
import { QuestionModule } from './question/question.module';
import { DatabaseModule } from './core/database/database.module';
import { ExamQuestionModule } from './exam-question/exam-question.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }), 
    UserModule, 
    ExamModule,
    QuestionModule, 
    DatabaseModule, ExamQuestionModule
  ]
})
export class AppModule {}
