import { Inject, Injectable } from '@nestjs/common';
import { createOldExamDto } from './dto/create-old-exam.dto';
import { OLD_EXAM_REPOSITORY } from 'src/core/constants/constants';
import { OldExam } from './old-exam.entity';

@Injectable()
export class OldExamService {
  constructor(@Inject(OLD_EXAM_REPOSITORY) private oldExamRepository: typeof OldExam) {}

  async createOldExam(dto: createOldExamDto, file: Express.Multer.File) {
    return await this.oldExamRepository.create({
        ...dto,
        path: file.filename
    });
  }   

  async findAllOldExams() {
    return await this.oldExamRepository.findAll<OldExam>();
  }

  async deleteoldExam(examId: string) {
    await this.oldExamRepository.destroy<OldExam>({
        where: {
            id: examId
        }
    });
}
}
