import { Module } from '@nestjs/common';
import { ExamStudentController } from './exam-student.controller';
import { ExamStudentService } from './exam-student.service';
import { examStudentProviders } from './exam-student.provider';

@Module({
  controllers: [ExamStudentController],
  providers: [ExamStudentService, ...examStudentProviders]
})
export class ExamStudentModule {}
