import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
import { EXAM_REPOSITORY } from 'src/core/constants/constants';
import { Exam } from './exam.entity';
import { User } from 'src/user/user.entity';
import { Question } from 'src/question/question.entity';

@Injectable()
export class ExamService {
    constructor(@Inject(EXAM_REPOSITORY) private examRepository: typeof Exam) {}

    async createExam(dto: CreateExamDto) {
        const exam = await this.examRepository.create<Exam>({
            ...dto
        });
        return exam.toJSON();
    }

    async getAllExams() {
        const exams = await this.examRepository.findAll<Exam>({
            include: [
                {
                    model: Question
                },
                {
                    model: User,
                    attributes: ['id', 'username', 'email', 'role']
                }
            ]
        });
        return exams;
    }

    async updateExam(examId: string, dto: UpdateExamDto) {
        const [numberOfAffectedRows, affectedRows] = await this.examRepository.update<Exam>(
            {
                ...dto
            }, 
            {
                where: {id: examId},
                returning: true
            }
        );
        return affectedRows[0];
    }

    async deleteExam(examId: string) {
        await this.examRepository.destroy<Exam>({
            where: {
                id: examId
            }
        });
    }
}

