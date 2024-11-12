import { Inject, Injectable } from '@nestjs/common';
import { EXAMQUESTION_REPOSITORY } from 'src/core/constants/constants';
import { ExamQuestion } from './exam-question.entity';
import { ExamQuestionDto } from './dto/exam-question.dto';

@Injectable()
export class ExamQuestionService {
    constructor(@Inject(EXAMQUESTION_REPOSITORY) private examStudentRepository: typeof ExamQuestion) {}

    async create(dto: ExamQuestionDto) {
        const doc = await this.examStudentRepository.create({
            ...dto
        });
        return doc.toJSON();
    }

    async delete(examStudentId: string) {
        await this.examStudentRepository.destroy<ExamQuestion>({
            where: {
                id: examStudentId
            }
        });
    }
}
