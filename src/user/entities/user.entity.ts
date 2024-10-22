export class User {
    id: number;
    username: string;
    email: string;
    role: Role;
    hash: string;
    // exams: [Exam];
}

enum Role {
    STUDENT,
    MANAGER,
    TEACHER
}