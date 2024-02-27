import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { jwtConstant } from 'src/constants';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwt: JwtService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const headers = request.headers.authorization?.split(' ') ?? [];
        const [type, token] = headers;
        if (type === 'Bearer') {
            try {
                const payload = await this.jwt.verifyAsync(token, { secret: jwtConstant.secret });
                request['user'] = payload;
            } catch {
                throw new UnauthorizedException();
            }
        } else {
            throw new UnauthorizedException();
        }
        return true;
    }
}