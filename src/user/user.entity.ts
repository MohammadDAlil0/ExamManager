import {
    Table,
    Column,
    Unique,
    Default,
    BelongsToMany,
    ForeignKey,
    HasMany
} from 'sequelize-typescript';
import { Exam } from 'src/exam/exam.entity';
import { BaseModel } from 'src/core/common-classes/base.model';
import { ExamStudent } from 'src/exam-student/exam-student.entity';

export enum Role {
STUDENT = 'STUDENT',
TEACHER = 'TEACHER',
ADMIN = 'ADMIN',
}
  
@Table
export class User extends BaseModel {  
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
  
    @BelongsToMany(() => Exam, () => ExamStudent)
    @ForeignKey(() => ExamStudent)
    exams: Exam[];

    @HasMany(() => Exam, {as: 'createdExams'})
    createdExams: Exam[];
}