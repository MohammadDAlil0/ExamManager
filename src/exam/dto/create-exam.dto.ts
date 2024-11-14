import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsDefined, IsInt, IsNotEmpty, IsPositive, IsString } from "class-validator";

export class CreateExamDto  {
    @ApiProperty({
        description: 'name of the exam',
        type: String,
        example: 'exam1'
    })
    @IsDefined()
    @IsString()
    @IsNotEmpty()
    name: string;
    
    @ApiProperty({
        description: 'duration of the exam',
        type: Number,
        example: 120
    })
    @IsInt()
    @IsPositive()
    duration: number;

    @ApiProperty({
        description: 'data of the exam',
        type: Date
    })
    @IsDate()
    @Type(() => Date)
    date: Date;
}