import { IsDate, IsDateString, IsDefined, IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateExamDto {
    @IsDefined()
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsInt()
    duration: number;

    @IsDateString()
    date: Date;
}