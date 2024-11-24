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

    async createExam(dto: CreateExamDto, user: User) {
        const exam = await this.examRepository.create<Exam>({
            ...dto,
            createdBy: user.id
        });
        return exam.toJSON();
    }

    async getAllExams(query: QueryParamsDto, user: User) {
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
                    as: 'students',
                    attributes: ['id', 'username'],
                },
                {
                    model: User,
                    as: 'creator',
                    attributes: ['id', 'username'],
                }
            ]
            : undefined;
        if (user.role === 'TEACHER' ) {
            if (include)include.pop();
            where['createdBy'] = user.id
        }

        const exams = await this.examRepository.findAll<Exam>({
            include,
            attributes: query.fields || undefined,
            offset: query.limit * (query.page - 1) || undefined,
            limit: query.limit || undefined,
            where
        });
        return exams;
    }

    async updateExam(examId: string, dto: UpdateExamDto, user: User) {
        const [numberOfAffectedRows, affectedRows] = await this.examRepository.update<Exam>(
            {
                ...dto
            }, 
            {
                where: {id: examId, createdBy: user.id},
                returning: true
            }
        );
        if (numberOfAffectedRows === 0) {
            throw new NotFoundException('There is no exam belongs to that user');
        }
        return affectedRows[0];
    }

    async deleteExam(examId: string, user: User) {
        const numberOfAffectedRows = await this.examRepository.destroy<Exam>({
            where: {
                id: examId, 
                createdBy: user.id
            }
        });
        if (numberOfAffectedRows === 0) {
            throw new NotFoundException('There is no exam belongs to that user');
        }
    }
}

