import {
    Table,
    Column,
    Model,
    PrimaryKey,
    AutoIncrement,
    DataType,
    ForeignKey,
    BelongsTo,
} from 'sequelize-typescript';
import { Exam } from 'src/exam/exam.entity';
import { BaseModel } from 'src/core/common-classes/base.model';
  
@Table
export class Question extends BaseModel {  
    @Column(DataType.ARRAY(DataType.STRING))  // Array of strings for options
    options: string[];
  
    @Column(DataType.INTEGER)
    answer: number;
  
    @ForeignKey(() => Exam)
    @Column({ type: DataType.UUID })
    examId: number;
  
    @BelongsTo(() => Exam, { onDelete: 'CASCADE' })
    exam: Exam;
}
  