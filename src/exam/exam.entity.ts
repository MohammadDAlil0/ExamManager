import {
    Table,
    Column,
    DataType,
    BelongsToMany,
} from 'sequelize-typescript';
import { BaseModel } from 'src/core/common-classes/base.model';
import { Question } from 'src/question/question.entity';
import { ExamQuestion } from 'src/exam-question/exam-question.entity';
import { ExamStudent } from 'src/exam-student/exam-student.entity';
import { User } from 'src/user/user.entity';

@Table
export class Exam extends BaseModel {
    @Column(DataType.STRING(36))
    name: string;
  
    @Column(DataType.INTEGER)
    duration: number;
  
    @Column(DataType.DATE)
    date: Date;
  
    @BelongsToMany(() => User, () => ExamStudent)
    students: User[];
  
    @BelongsToMany(() => Question, () => ExamQuestion)
    questions: Question[];
}
  