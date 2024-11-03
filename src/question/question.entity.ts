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
  
@Table
export class Question extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;
  
    @Column(DataType.ARRAY(DataType.STRING))  // Array of strings for options
    options: string[];
  
    @Column(DataType.INTEGER)
    answer: number;
  
    @ForeignKey(() => Exam)
    @Column
    examId: number;
  
    @BelongsTo(() => Exam, { onDelete: 'CASCADE' })
    exam: Exam;
}
  