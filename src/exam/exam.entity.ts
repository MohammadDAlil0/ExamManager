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
import { Question } from 'src/question/question.entity';
import { ExamQuestion } from 'src/relationships/exam-question.entity';
import { ExamStudent } from 'src/relationships/exam-student.entity';
import { User } from 'src/user/user.entity';

@Table
export class Exam extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;
  
    @Column
    name: string;
  
    @Column(DataType.INTEGER)
    duration: number;
  
    @Column(DataType.DATE)
    date: Date;
  
    @BelongsToMany(() => User, () => ExamStudent)
    students: User[];
  
    @BelongsToMany(() => Question, () => ExamQuestion)
    questions: Question[];
  
    @CreatedAt
    @Default(DataType.NOW)
    @Column
    createdAt: Date;
  
    @UpdatedAt
    @Column
    updatedAt: Date;
}
  