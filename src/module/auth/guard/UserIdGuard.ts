import { ExecutionContext, Injectable } from '@nestjs/common';
import { IJwtPayload } from '../interface';
import { AbstractGuard } from './AbstractGuard';
import { AuthService } from '../service/AuthService';

@Injectable()
export class UserIdGuard extends AbstractGuard {
    constructor(authService: AuthService) {
        super(authService);
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            const targetId: string = context.getArgByIndex<string>(1).split(':')[1];
            const { userId }: IJwtPayload = await this.decodeJwtToken(context);

            return targetId === userId;
        } catch (e) {
            return false;
        }
    }
}
