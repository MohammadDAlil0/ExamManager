import { IsDateString, IsDefined, IsInt, IsNotEmpty, IsPositive, IsString } from "class-validator";

export class CreateExamDto {
    @IsDefined()
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsInt()
    @IsPositive()
    duration: number;

    @IsDateString()
    date: Date;
}