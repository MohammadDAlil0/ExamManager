import { applyDecorators, Delete, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Roles } from "src/user/decorator/role.decorator";
import { JwtGuard } from "src/user/guard/jwt.guard";
import { RolesGuard } from "src/user/guard/roles.guard";
import { Role } from "src/user/user.entity";

export function GlobalExamQuestionDecorator() {
    return applyDecorators(
        UseGuards(JwtGuard ,RolesGuard),
        Roles(Role.ADMIN, Role.TEACHER),
        ApiBearerAuth()
    );
}

export function CreateExamQuestionDecorator() {
    return applyDecorators(
        ApiOperation({ summary: 'Add Question For An Exam' }),
        ApiResponse({ status: 201, description: 'You will get a message' }),
        Post()
    );
}


export function RemoveExamQuestionDecorator() {
    return applyDecorators(
        ApiOperation({ summary: 'Remove Student From An Exam' }),
        ApiResponse({ status: 204, description: 'You will not get anything' }),
        Delete(':id')
    );
}

