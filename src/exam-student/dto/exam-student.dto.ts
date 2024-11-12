import { IsDefined, IsString, IsUUID } from "class-validator";

export class ExamStudentDto {
    @IsUUID()
    @IsDefined()
    examId: string;

    @IsUUID()
    @IsDefined()
    userId: string;
}