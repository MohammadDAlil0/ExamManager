import {
    Table,
    Column,
    Model,
    PrimaryKey,
    AutoIncrement,
    Unique,
    Default,
    HasMany,
} from 'sequelize-typescript';
import { Exam } from 'src/exam/exam.entity';

enum Role {
STUDENT = 'STUDENT',
TEACHER = 'TEACHER',
ADMIN = 'ADMIN',
}
  
@Table
export class User extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;
  
    @Unique
    @Column
    username: string;
  
    @Unique
    @Column
    email: string;
  
    @Default(Role.STUDENT)
    @Column
    role: Role;
  
    @Column
    hash: string;
  
    @HasMany(() => Exam)
    exams: Exam[];
}