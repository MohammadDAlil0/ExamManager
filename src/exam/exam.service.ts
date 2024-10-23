import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateExamDto } from './dto/create-exam.dto';

@Injectable()
export class ExamService {
    constructor(private prisma: PrismaService) {}

    async createExam(dto: CreateExamDto) {
        const exam = await this.prisma.exam.create({
            data: dto
        });
        return exam;
    }

    async getAllExams() {
        const exams = await this.prisma.exam.findMany();
        return exams;
    }

}

