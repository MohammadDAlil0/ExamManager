import { applyDecorators, Delete, Get, Post, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Roles } from "src/user/decorator/role.decorator";
import { JwtGuard } from "src/user/guard/jwt.guard";
import { RolesGuard } from "src/user/guard/roles.guard";
import { Role } from "src/user/user.entity";

export function GlobalOldExamDecorator() {
    return applyDecorators(
        UseGuards(JwtGuard ,RolesGuard),
        Roles(Role.ADMIN, Role.TEACHER),
        ApiBearerAuth()
    );
}

export function UploadOldFileDecorator() {
    return applyDecorators(
        ApiOperation({ summary: 'Upload Old Exam' }),
        ApiConsumes('multipart/form-data'),
        ApiResponse({ status: 201, description: 'You will get a message' }),
        ApiBody({
            schema: {
                type: 'object',
                properties: {
                name: { type: 'string' },
                date: { type: 'string', format: 'date' },
                file: {
                    type: 'string',
                    description: 'Exam File',
                    format: 'binary',
                },
                },
            },
        }),
        Post('create'),
        UseInterceptors(FileInterceptor('file'))
    );
}




export function FindAllDecorator() {
    return applyDecorators(
        ApiOperation({ summary: 'Get All Old Exams' }),
        ApiResponse({ status: 200, description: 'You will get all the old exams' }),
        Get()
    );
}

export function RemoveOldExamDecorator() {
    return applyDecorators(
        ApiOperation({ summary: 'Delete Old Exam' }),
        ApiResponse({ status: 204, description: 'You will not get anything' }),
        Delete(':id')
    );
}

