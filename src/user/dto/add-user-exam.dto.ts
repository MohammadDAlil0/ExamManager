import { IsInt } from "class-validator";

export class AddUserExamDto {
    @IsInt()
    userId: number;
    
    @IsInt()
    examId: number;
}