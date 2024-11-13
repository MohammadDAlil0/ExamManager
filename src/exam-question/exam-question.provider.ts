import { EXAMQUESTION_REPOSITORY } from "src/core/constants/constants";
import { ExamQuestion } from "./exam-question.entity";

export const examQuestionProviders = [
    {
        provide: EXAMQUESTION_REPOSITORY,
        useValue: ExamQuestion
    }
]