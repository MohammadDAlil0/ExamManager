import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
import { EXAM_REPOSITORY } from 'src/core/constants/constants';
import { Exam } from './exam.entity';
import { User } from 'src/user/user.entity';
import { Question } from 'src/question/question.entity';
import { QueryParamsDto } from 'src/core/global-dto/query-params.dto';
import { Op } from 'sequelize';
import { GlobalQueryFilter } from 'src/core/utils/global-filter';

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
        const queryFilter = new GlobalQueryFilter<Exam>(query)
        .setFields(['id', 'name', 'duration'])
        .setSearch(['name'])
        .setPagination()
        .setInclude([
            { model: Question },
            { model: User, as: 'students', attributes: ['id', 'username'] },
            { model: User, as: 'creator', attributes: ['id', 'username'] }
        ])
        .applyUserFilter(user)
        .getOptions()
        
        const exams = await this.examRepository.findAll<Exam>(queryFilter);
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

