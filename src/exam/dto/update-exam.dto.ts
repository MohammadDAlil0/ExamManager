import { IsDateString, IsDefined, IsInt, IsNotEmpty, IsOptional, IsPositive, IsString } from "class-validator";

export class UpdateExamDto {
    @IsDefined()
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    name?: string;

    @IsInt()
    @IsPositive()
    @IsOptional()
    duration?: number;

    @IsDateString()
    @IsOptional()
    date?: Date;
}