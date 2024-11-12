import { Type } from "class-transformer";
import { IsDate, IsDefined, IsInt, IsNotEmpty, IsPositive, IsString } from "class-validator";

export class CreateExamDto {
    @IsDefined()
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsInt()
    @IsPositive()
    duration: number;

    @IsDate()
    @Type(() => Date)
    date: Date;
}