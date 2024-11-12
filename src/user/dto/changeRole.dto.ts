// import { Role } from "@prisma/client";
import { IsEnum } from "class-validator";
import { Role } from "../user.entity";
import { ApiProperty } from "@nestjs/swagger";

export class ChangeRoleDto {
    @IsEnum(Role)
    @ApiProperty({
        description: 'Role of a user',
        enum: ['STUDENT', 'TEACHER', 'ADMIN']
    })
    role: Role
}