import { Question } from "./question.entity";
import { QUESTION_REPOSITORY } from "src/core/constants/constants";

export const questionProviders = [
    {
        provide: QUESTION_REPOSITORY,
        useValue: Question
    }
]