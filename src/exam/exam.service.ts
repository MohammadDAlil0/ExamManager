import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class ExamService {
    constructor(private prisma: PrismaService) {}

    async createExam(dto: CreateExamDto) {
        dto.date = new Date(dto.date);
        const exam = await this.prisma.exam.create({
            data: dto
        });
        return exam;
    }

    async getAllExams() {
        const exams = await this.prisma.exam.findMany();
        return exams;
    }

    async updateExam(examId:number, dto: UpdateExamDto) {
        try {
            dto.date = new Date(dto.date);
            const exam = await this.prisma.exam.update({
                where: {
                    id: examId
                },
                data: {
                    ...dto
                }
            });
            return exam;
        }
        catch(err) {
            if (err instanceof PrismaClientKnownRequestError) {
                if (err.code === 'P2025') {
                   throw new NotFoundException('Exam not found');
                 }
            }
        }
    }

    async deleteExam(examId: number) {
        try {
            return await this.prisma.exam.delete({
                where: {
                    id: examId
                }
            })
        }
        catch(err) {
            if (err instanceof PrismaClientKnownRequestError) {
                if (err.code === 'P2025') {
                   throw new NotFoundException('Exam not found');
                }
            }
            throw err;
        }
    }

}

