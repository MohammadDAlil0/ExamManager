import { applyDecorators, Delete, Get, HttpCode, HttpStatus, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Roles } from "src/user/decorator/role.decorator";
import { JwtGuard } from "src/user/guard/jwt.guard";
import { Role } from "src/user/user.entity";

export function GlobalQuestionDecorator() {
    return applyDecorators(
        UseGuards(JwtGuard),
        Roles(Role.TEACHER, Role.ADMIN),
        ApiBearerAuth()
    );
}

export function CreateQuestionDecorator() {
    return applyDecorators(
        ApiOperation({ summary: 'Create Question' }),
        ApiResponse({ status: 201, description: 'You will get the created Question' }),
        Post()
    );
}

export function GetAllQuestionsDecorator() {
    return applyDecorators(
        ApiOperation({ summary: 'Get All Questions' }),
        ApiResponse({ status: 201, description: 'You will get all the Questions' }),
        Get()
    );
}

export function UpdateQuestionDecorator() {
    return applyDecorators(
        ApiOperation({ summary: 'Update Question' }),
        ApiResponse({ status: 201, description: 'You will get the updated Question' }),
        Patch(':id')
    );
}

export function DeleteQuestionDecorator() {
    return applyDecorators(
        ApiOperation({ summary: 'Delete Question' }),
        ApiResponse({ status: 204, description: 'You will not get anything' }),
        HttpCode(HttpStatus.NO_CONTENT),
        Delete(':id')
    );
}