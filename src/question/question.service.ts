import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateQuestionDto } from './dto/create-question.dto';

@Injectable()
export class QuestionService {
    constructor(private prisma: PrismaService) {}
    
    async createQuestion(dto: CreateQuestionDto) {
        console.log(dto);
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

}
