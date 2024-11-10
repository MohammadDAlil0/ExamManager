import { CreationOptional } from "sequelize";
import { Column, CreatedAt, DataType, Default, Model, PrimaryKey, UpdatedAt } from "sequelize-typescript";

export class BaseModel extends Model {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column({type: DataType.UUIDV4})
    id: CreationOptional<string>;


    @CreatedAt
    @Default(DataType.NOW)
    @Column
    createdAt: Date;
  
    @UpdatedAt
    @Column
    updatedAt: Date;
}