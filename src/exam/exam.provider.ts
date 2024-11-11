import { EXAM_REPOSITORY } from "src/core/constants/constants";
import { Exam } from "./exam.entity";

export const examProviders = [
    {
        provide: EXAM_REPOSITORY,
        useValue: Exam
    }
] 
