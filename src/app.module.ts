import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { ExamModule } from './exam/exam.module';
import { QuestionModule } from './question/question.module';
import { DatabaseModule } from './core/database/database.module';
import { ExamQuestionModule } from './exam-question/exam-question.module';
import { OldExamModule } from './old-exam/old-exam.module';
import { ExamStudentModule } from './exam-student/exam-student.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      ttl: 15,
    }),
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
  ],
  controllers: [AppController],
  providers: [
    AppService
  ]
})
export class AppModule {}
