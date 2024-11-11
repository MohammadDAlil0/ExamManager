import { Module } from '@nestjs/common';
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';
import { questionProviders } from './question.provider';

@Module({
    controllers: [QuestionController],
    providers: [QuestionService, ...questionProviders]
})
export class QuestionModule {}
