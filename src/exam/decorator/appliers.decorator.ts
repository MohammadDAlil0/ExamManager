import { applyDecorators, Delete, Get, HttpCode, HttpStatus, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Roles } from "src/user/decorator/role.decorator";
import { JwtGuard } from "src/user/guard/jwt.guard";
import { RolesGuard } from "src/user/guard/roles.guard";
import { Role } from "src/user/user.entity";

export function GlobalExamDecorator() {
    return applyDecorators(
        UseGuards(JwtGuard, RolesGuard),
        Roles(Role.ADMIN, Role.TEACHER),
        ApiBearerAuth()
    );
}

export function CreateExamDecorator() {
    return applyDecorators(
        ApiOperation({ summary: 'Create Exam' }),
        ApiResponse({ status: 201, description: 'You will get the created exam' }),
        Post()
    );
}

export function GetAllExamsDecorator() {
    return applyDecorators(
        ApiOperation({ summary: 'Get All Exams' }),
        ApiResponse({ status: 201, description: 'You will get all the exams' }),
        Get()
    );
}

export function UpdateExamDecorator() {
    return applyDecorators(
        ApiOperation({ summary: 'Update Exam' }),
        ApiResponse({ status: 201, description: 'You will get the updated exam' }),
        Patch(':id')
    );
}

export function DeleteExamDecorator() {
    return applyDecorators(
        ApiOperation({ summary: 'Delete Exam' }),
        ApiResponse({ status: 201, description: 'You will not get anything' }),
        HttpCode(HttpStatus.NO_CONTENT),
        Delete(':id')
    );
}

