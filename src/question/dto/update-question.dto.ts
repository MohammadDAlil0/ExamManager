import { IsArray, IsDefined, IsInt, IsOptional, IsString } from "class-validator";
import { IsAnswerValid } from "../../validators/answer.validator";

export class UpdateQuestionDto {
    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    options?: string[];

    @IsAnswerValid()
    @IsOptional()
    answer?: number;
}