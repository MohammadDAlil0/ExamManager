import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { ExamModule } from './exam/exam.module';
import { QuestionModule } from './question/question.module';
import { DatabaseModule } from './database/database.module';
import { ExamSudentModule } from './exam-sudent/exam-sudent.module';
import { ExamStudentModule } from './exam-student/exam-student.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }), 
    UserModule, 
    PrismaModule, 
    ExamModule,
    QuestionModule, 
    DatabaseModule, ExamSudentModule, ExamStudentModule
  ]
})
export class AppModule {}
