import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '@prisma/client';
import { ROLES_KEY } from '../decorator/role.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {
  }
  
  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (requiredRoles.length === 0) {
      return true;
    }
    const request = context.switchToHttp().getRequest();

    if (!request.user) {
      throw new UnauthorizedException('User Id not found');
    }
    
    const user = request.user;
    if(!requiredRoles.includes(user.role)) {
      throw new UnauthorizedException(`You must be ${requiredRoles}`);
    }
    return true;
  }
}