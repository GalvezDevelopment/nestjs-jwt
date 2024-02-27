import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUser } from 'src/dto/create-user.dto';
import { Login } from 'src/dto/login.dto';
import { User } from 'src/interfaces/user.interface';
import { hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
    private _users: User[];
    private _saltRounds = 10; 

    constructor(private jwt: JwtService) {
        this._users = [];
    }

    async register(user: CreateUser): Promise<string> {
        const { name, lastName, password, email } = user;
        const newPwd = await this.hashPwd(password);
        this._users.push({ name, lastName, password: newPwd, creationDate: new Date(), email });
        return this.jwt.signAsync({ sub: user.email, name: user.name });
    }

    async login(credentials: Login): Promise<boolean> {
        const user = this._users.find(u => u.email === credentials.email);
        if (!user) throw new HttpException('User does not exist.', HttpStatus.NOT_FOUND);
        return compare(credentials.password, user.password);
    }

    all(): User[] {
        return this._users;
    }

    removeAll(): void {
        this._users = [];
    }

    private async hashPwd(password: string): Promise<string> {
        const newPwd = await hash(password, this._saltRounds);
        return newPwd;
    }
}
