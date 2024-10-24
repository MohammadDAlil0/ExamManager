import { IsArray, IsDefined, IsInt, IsOptional, IsString } from "class-validator";
import { IsAnswerValid } from "../../validators/answer.validator";

export class UpdateQuestionDto {
    @IsArray()
    @IsString({ each: true })
    options: string[];

    @IsAnswerValid()
    answer: number;
}