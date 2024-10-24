import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class QuestionService {
    constructor(private prisma: PrismaService) {}
    
    async createQuestion(dto: CreateQuestionDto) {
        const isExamExist = await this.prisma.exam.findUnique({
            where: {
                id: dto.examId
            }     
        });
        if (!isExamExist) {
            throw new NotFoundException('Exam not found!');
        }
        return await this.prisma.question.create({
            data: dto
        });
    }


    async getAllQuestions() {
        const questions = await this.prisma.question.findMany();
        return questions;
    }

    async updateQuestion(questionId:number, dto: UpdateQuestionDto) {
        try {
            const question = await this.prisma.question.update({
                where: {
                    id: questionId
                },
                data: {
                    ...dto
                }
            });
            return question;
        }
        catch(err) {
            if (err instanceof PrismaClientKnownRequestError) {
                if (err.code === 'P2025') {
                   throw new NotFoundException('question not found');
                 }
            }
        }
    }

    async deleteQuestion(questionId: number) {
        try {
            return await this.prisma.question.delete({
                where: {
                    id: questionId
                }
            })
        }
        catch(err) {
            if (err instanceof PrismaClientKnownRequestError) {
                if (err.code === 'P2025') {
                   throw new NotFoundException('Question not found');
                }
            }
            throw err;
        }
    }
}
