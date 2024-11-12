import { Table, Column, ForeignKey, DataType } from 'sequelize-typescript';
import { BaseModel } from 'src/core/common-classes/base.model';
import { Exam } from 'src/exam/exam.entity';
import { User } from 'src/user/user.entity';

@Table
export class ExamStudent extends BaseModel {
  @ForeignKey(() => Exam)
  @Column({type: DataType.UUID })
  examId: string;

  @ForeignKey(() => User)
  @Column({type: DataType.UUID })
  userId: string;
}
