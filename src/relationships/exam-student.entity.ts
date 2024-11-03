import { Table, Column, Model, ForeignKey } from 'sequelize-typescript';
import { Exam } from 'src/exam/exam.entity';
import { User } from 'src/user/user.entity';

@Table
export class ExamStudent extends Model {
  @ForeignKey(() => Exam)
  @Column
  examId: number;

  @ForeignKey(() => User)
  @Column
  userId: number;
}
