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
        const doc = await this.questionRepository.create({
            ...dto
        });
        console.log(doc);
        return doc;
    }


    async getAllQuestions() {
        const questions = await this.questionRepository.findAll();
        return questions;
    }

    async updateQuestion(questionId: string, dto: UpdateQuestionDto) {
        const [numberOfAffectedRows, affectedRows] = await this.questionRepository.update(
            {
                ...dto
            }, {
                where: {id: questionId},
                returning: true
            }
        );
        return affectedRows[0];
    }

    async deleteQuestion(questionId: string) {
        return await this.questionRepository.destroy({
            where: {
                id: questionId
            }
        });
    }
}
