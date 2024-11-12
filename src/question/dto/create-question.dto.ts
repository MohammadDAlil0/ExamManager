import { IsArray, IsDefined, IsString, IsUUID } from "class-validator";
import { IsAnswerValid } from "../../core/validators/answer.validator";

export class CreateQuestionDto {
    @IsArray()
    @IsString({ each: true })
    options: string[];

    @IsAnswerValid()
    answer: number;

    @IsUUID()
    @IsDefined()
    examId: string;
}