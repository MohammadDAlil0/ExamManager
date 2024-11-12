import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { ExamModule } from './exam/exam.module';
import { QuestionModule } from './question/question.module';
import { DatabaseModule } from './core/database/database.module';
import { ExamQuestionModule } from './exam-question/exam-question.module';
import { OldExamModule } from './old-exam/old-exam.module';
import { ExamStudentModule } from './exam-student/exam-student.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }), 
    UserModule, 
    ExamModule,
    QuestionModule,
    ExamStudentModule,
    DatabaseModule, 
    ExamQuestionModule, 
    OldExamModule
  ]
})
export class AppModule {}
