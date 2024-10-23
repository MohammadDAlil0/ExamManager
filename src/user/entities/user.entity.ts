import { Role } from "@prisma/client";

export class IUser {
    id: number;
    username: string;
    email: string;
    role: Role;
    hash?: string;
    // exams: [Exam];
}