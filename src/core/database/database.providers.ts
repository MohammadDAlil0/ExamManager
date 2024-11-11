
import { Sequelize } from 'sequelize-typescript';
import { ConfigService } from '@nestjs/config';
import { SEQUELIZE } from 'src/core/constants/constants';
import { User } from 'src/user/user.entity';
import { Exam } from 'src/exam/exam.entity';
import { ExamQuestion } from 'src/exam-question/exam-question.entity';
import { ExamStudent } from 'src/exam-student/exam-student.entity';
import { Question } from 'src/question/question.entity';

export const databaseProviders = [
  {
    provide: SEQUELIZE,
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const sequelize = new Sequelize({
        dialect: configService.getOrThrow('DATA_BASE_DIALECT'),
        host: configService.getOrThrow('DATA_BASE_HOST'),
        port: configService.getOrThrow('DATA_BASE_PORT'),
        username: configService.getOrThrow('DATA_BASE_USERNAME'),
        password: configService.getOrThrow('DATA_BASE_PASSWORD'),
        database: configService.getOrThrow('DATA_BASE_NAME'),
      });
      sequelize.addModels([User, Exam, ExamQuestion, ExamStudent, Question]);
      await sequelize.sync();
      return sequelize;
    }
  },
];
