import { CreationOptional } from 'sequelize';
import {
    Table,
    Column,
    Model,
    PrimaryKey,
    AutoIncrement,
    Default,
    DataType,
    BelongsToMany,
    CreatedAt,
    UpdatedAt,
} from 'sequelize-typescript';
import { BaseModel } from 'src/core/common-classes/base.model';
import { Question } from 'src/question/question.entity';
import { ExamQuestion } from 'src/relationships/exam-question.entity';
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
  