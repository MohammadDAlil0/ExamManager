import { Table, Column, Model, ForeignKey, DataType } from 'sequelize-typescript';
import { BaseModel } from 'src/core/common-classes/base.model';
import { Exam } from 'src/exam/exam.entity';
import { Question } from 'src/question/question.entity';
@Table
export class ExamQuestion extends BaseModel {
  @ForeignKey(() => Exam)
  @Column({type: DataType.UUID })
  examId: string;

  @ForeignKey(() => Question)
  @Column({type: DataType.UUID })
  questionId: string;
}
