import { PickType } from "@nestjs/swagger";
import { SignupDto } from "./Signup.dto";

export class LoginDto extends PickType(SignupDto, ['email', 'password'] as const) {}
