import { Table, Column, Model, ForeignKey } from 'sequelize-typescript';
import { Exam } from 'src/exam/exam.entity';
import { Question } from 'src/question/question.entity';
@Table
export class ExamQuestion extends Model {
  @ForeignKey(() => Exam)
  @Column
  examId: number;

  @ForeignKey(() => Question)
  @Column
  questionId: number;
}
