import { Inject, Injectable } from '@nestjs/common';
import { EXAMSTUDENT_REPOSITORY } from 'src/core/constants/constants';
import { ExamStudent } from './exam-student.entity';
import { ExamStudentDto } from './dto/exam-student.dto';

@Injectable()
export class ExamStudentService {
    constructor(@Inject(EXAMSTUDENT_REPOSITORY) private examStudentRepository: typeof ExamStudent) {}

    async create(dto: ExamStudentDto) {
        const doc = await this.examStudentRepository.create({
            ...dto
        });
        return doc.toJSON();
    }

    async delete(examStudentId: string) {
        await this.examStudentRepository.destroy<ExamStudent>({
            where: {
                id: examStudentId
            }
        });
    }
}
