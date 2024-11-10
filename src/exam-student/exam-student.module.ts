import { Module } from '@nestjs/common';
import { ExamStudentController } from './exam-student.controller';
import { ExamStudentService } from './exam-student.service';

@Module({
  controllers: [ExamStudentController],
  providers: [ExamStudentService]
})
export class ExamStudentModule {}
