import { OLD_EXAM_REPOSITORY } from "src/core/constants/constants";
import { OldExam } from "./old-exam.entity";

export const oldExamProviders = [
    {
        provide: OLD_EXAM_REPOSITORY,
        useValue: OldExam
    }
] 
