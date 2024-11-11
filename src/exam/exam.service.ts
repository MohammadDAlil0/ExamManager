import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
import { uploadOldExamDto } from './dto/upload-old-exam.dto';
import { EXAM_REPOSITORY } from 'src/core/constants/constants';
import { Exam } from './exam.entity';
import { User } from 'src/user/user.entity';

@Injectable()
export class ExamService {
    constructor(@Inject(EXAM_REPOSITORY) private examRepository: typeof Exam) {}

    async createExam(dto: CreateExamDto) {
        dto.date = new Date(dto.date);
        const exam = await this.examRepository.create<Exam>({
            data: dto
        });
        return exam;
    }

    async getAllExams() {
        const exams = await this.examRepository.findAll<Exam>({
            include: [
                {
                    model: Exam
                },
                {
                    model: User,
                    attributes: ['id', 'username', 'email', 'role']
                }
            ]
        });
        return exams;
    }

    async updateExam(examId:number, dto: UpdateExamDto) {
        try {
            dto.date = new Date(dto.date);
            const exam = await this.examRepository.update<Exam>({
                dto
            }, {
                where: {id: examId},
                returning: true
            });
            return exam;
        }
        catch(err) {
            console.log(err);
            throw err;
        }
    }

    async deleteExam(examId: number) {
        try {
            return await this.examRepository.destroy<Exam>({
                where: {
                    id: examId
                }
            });
        }
        catch(err) {
            console.log(err);
            throw err;
        }
    }

    async uploadOldExam(dto: uploadOldExamDto, file: Express.Multer.File) {
        return 'TODO'
    }

}

