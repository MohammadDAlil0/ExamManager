import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { QUESTION_REPOSITORY } from 'src/core/constants/constants';
import { Question } from './question.entity';

@Injectable()
export class QuestionService {
    constructor(
        @Inject(QUESTION_REPOSITORY) private questionRepository: typeof Question
    ) {}
    
    async createQuestion(dto: CreateQuestionDto) {
        return await this.questionRepository.create({
            data: dto
        });
    }


    async getAllQuestions() {
        const questions = await this.questionRepository.findAll();
        return questions;
    }

    async updateQuestion(questionId:number, dto: UpdateQuestionDto) {
        try {
            const question = await this.questionRepository.update(
                {
                    dto
                }, {
                    where: {id: questionId}
                }
            );
            return question;
        }
        catch(err) {
            console.log(err);
            throw err;
        }
    }

    async deleteQuestion(questionId: number) {
        try {
            return await this.questionRepository.destroy({
                where: {
                    id: questionId
                }
            });
        }
        catch(err) {
            console.log(err);
            throw err;
        }
    }
}
