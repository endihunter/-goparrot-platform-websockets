import { CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthService } from '../service/AuthService';
import { IJwtPayload } from '../interface';
import { WsException } from '@nestjs/websockets';

export class AbstractGuard implements CanActivate {
    constructor(private readonly authService: AuthService) {
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        throw new Error('Should be implemented by a child class.');
    }

    protected async decodeJwtToken(context: ExecutionContext): Promise<IJwtPayload> {
        const {
            headers: { authorization },
        } = context.switchToHttp().getRequest().handshake;

        const token: string = authorization?.split(' ')[1];
        if (!token) {
            throw new WsException('Missing authorization token');
        }

        return this.authService.getPayload(token);
    }
}
