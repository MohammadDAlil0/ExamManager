import { IsArray, IsDefined, IsInt, IsString } from "class-validator";
import { IsAnswerValid } from "../../core/validators/answer.validator";

export class CreateQuestionDto {
    @IsArray()
    @IsString({ each: true })
    options: string[];

    @IsAnswerValid()
    answer: number;

    @IsInt()
    @IsDefined()
    examId: number;
}