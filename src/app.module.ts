import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { ExamModule } from './exam/exam.module';
import { QuestionService } from './question/question.service';
import { QuestionController } from './question/question.controller';
import { QuestionModule } from './question/question.module';

@Module({
  imports: [UserModule, PrismaModule, ConfigModule.forRoot({
    isGlobal: true
  }), ExamModule, QuestionModule]
})
export class AppModule {}
