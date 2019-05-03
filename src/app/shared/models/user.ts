import {Role} from './role';

export class User {

    id: number;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    login: string;
    password: string;
    role: Role;
}
