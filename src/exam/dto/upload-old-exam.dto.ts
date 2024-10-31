import { Type } from "class-transformer";
import { IsDefined, IsISO8601, IsNotEmpty, IsString } from "class-validator";

export class uploadOldExamDto {
    @IsDefined()
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @Type(() => Date)
    date: Date;
}