import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
import { EXAM_REPOSITORY } from 'src/core/constants/constants';
import { Exam } from './exam.entity';
import { User } from 'src/user/user.entity';
import { Question } from 'src/question/question.entity';
import { QueryParamsDto } from 'src/core/global-dto/query-params.dto';
import { Op } from 'sequelize';

@Injectable()
export class ExamService {
    constructor(@Inject(EXAM_REPOSITORY) private examRepository: typeof Exam) {}

    async createExam(dto: CreateExamDto) {
        const exam = await this.examRepository.create<Exam>({
            ...dto
        });
        return exam.toJSON();
    }

    async getAllExams(query: QueryParamsDto) {
        if (query.fields) {
            query.fields = query.fields.filter((value) => ['id', 'name', 'duration'].includes(value));
        }

        const where: any = {};
        if (query.search) {
        where[Op.or] = [
            { name: { [Op.like]: `%${query.search}%` } }
        ];
        }

        const include = query.populate
            ? 
            [
                {
                    model: Question,
                },
                {
                    model: User,
                    attributes: ['id', 'username', 'email', 'role'],
                },
            ]
            : undefined;

        const exams = await this.examRepository.findAll<Exam>({
            include,
            attributes: query.fields || undefined,
            offset: query.limit * (query.page - 1) || undefined,
            limit: query.limit || undefined,
            where
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

