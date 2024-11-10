import { EXAMSTUDENT_REPOSITORY } from "src/core/constants/constants";
import { ExamStudent } from "./exam-student.entity";

export const examStudentProviders = [{
    provide: EXAMSTUDENT_REPOSITORY,
    useValue: ExamStudent
}];