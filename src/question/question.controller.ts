import { Body, Controller, Post } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { QuestionService } from './question.service';

@Controller('question')
export class QuestionController {
    constructor(private questionService: QuestionService) {}


    @Post()
    createQuestion(@Body() dto: CreateQuestionDto) {
        return this.questionService.createQuestion(dto);

    }
}
