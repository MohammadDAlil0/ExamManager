import {
    Table,
    Column,
    DataType,
} from 'sequelize-typescript';
import { BaseModel } from 'src/core/common-classes/base.model';
  
@Table
export class Question extends BaseModel {  
    @Column(DataType.ARRAY(DataType.STRING))  // Array of strings for options
    options: string[];
  
    @Column(DataType.INTEGER)
    answer: number;
}
  