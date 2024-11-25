import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { USER_REPOSITORY } from "src/core/constants/constants";
import { User } from "../user.entity";


@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(config: ConfigService, @Inject(USER_REPOSITORY) private userRepository: typeof User) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: config.get('JWT_SECRET')
        });
    }

    async validate(payload: {
        sub: number,
        email: string
    }) {
        const user: User = await this.userRepository.findOne({
            where: {
                id: payload.sub
            }
        });
        if (!user) {
            throw new NotFoundException('User not found')
        }
        delete user.hash;
        return user;
    }

}