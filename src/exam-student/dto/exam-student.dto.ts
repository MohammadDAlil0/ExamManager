import { IsDefined, IsString, IsUUID } from "class-validator";
import { BaseModel } from "src/core/common-classes/base.model";

export class ExamStudentDto {
    @IsUUID()
    @IsDefined()
    examId: string;

    @IsUUID()
    @IsDefined()
    userId: string;
}