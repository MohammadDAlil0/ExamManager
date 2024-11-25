import { Body, Controller, Param, ParseUUIDPipe, Query } from '@nestjs/common';
import { CreateExamDto } from './dto/create-exam.dto';
import { ExamService } from './exam.service';
import { UpdateExamDto } from './dto/update-exam.dto';
import { CreateExamDecorator, DeleteExamDecorator, GetAllExamsDecorator, GlobalExamDecorator, UpdateExamDecorator } from './decorator/appliers.decorator';
import { QueryParamsDto } from 'src/core/global-dto/query-params.dto';
import { GetUser } from 'src/user/decorator/get-user.decorator';
import { User } from 'src/user/user.entity';

@GlobalExamDecorator()
@Controller('exam')
export class ExamController {
    constructor(private readonly examService: ExamService) {}

    @CreateExamDecorator()
    createExam(@Body() dto: CreateExamDto, @GetUser() user: User) {
        return this.examService.createExam(dto, user);
    }

    @GetAllExamsDecorator()
    getAllExams(@Query() query: QueryParamsDto, @GetUser() user: User) {
        return this.examService.getAllExams(query, user);
    }

    @UpdateExamDecorator()
    updateExam(@Param('id', ParseUUIDPipe) examId: string, @Body() dto: UpdateExamDto, @GetUser() user: User) {
        return this.examService.updateExam(examId, dto, user);
    }

    @DeleteExamDecorator()
    deleteExam(@Param('id', ParseUUIDPipe) examId: string, @GetUser() user: User) {
        return this.examService.deleteExam(examId, user);
    }
}
