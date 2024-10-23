import { IsArray, IsDefined, IsInt, IsString } from "class-validator";
import { IsAnswerValid } from "../../validators/answer.validator";

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