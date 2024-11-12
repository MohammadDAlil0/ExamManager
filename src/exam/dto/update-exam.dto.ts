import { Type } from "class-transformer";
import { IsDate, IsDateString, IsDefined, IsInt, IsNotEmpty, IsOptional, IsPositive, IsString } from "class-validator";

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

    @IsDate()
    @Type(() => Date)
    date?: Date;
}