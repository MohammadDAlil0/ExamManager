import { Column, DataType, Table } from "sequelize-typescript";
import { BaseModel } from "src/core/common-classes/base.model";

@Table
export class OldExam extends BaseModel {
    @Column(DataType.STRING(36))
    name: string;
  
    @Column(DataType.DATE)
    date: Date;
  
    @Column(DataType.STRING(1000))
    path: string;
}
  