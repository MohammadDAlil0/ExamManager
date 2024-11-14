import { IsArray, IsDefined, IsString, IsUUID } from "class-validator";
import { IsAnswerValid } from "../../core/validators/answer.validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateQuestionDto {
    @ApiProperty({
        description: 'options of the question',
        type: String,
        example: ['option1', 'option2', 'option3', 'option4']
    })
    @IsArray()
    @IsString({ each: true })
    options: string[];

    @ApiProperty({
        description: 'answer of the question',
        type: Number,
        example: 1
    })
    @IsAnswerValid()
    answer: number;
}