// import { Role } from "@prisma/client";
import { IsEnum } from "class-validator";
import { Role } from "../user.entity";

export class ChangeRoleDto {
    @IsEnum(Role)
    role: Role
}