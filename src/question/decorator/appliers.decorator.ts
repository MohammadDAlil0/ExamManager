import { applyDecorators, UseGuards } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
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