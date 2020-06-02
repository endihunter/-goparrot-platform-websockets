import { ExecutionContext, Injectable } from '@nestjs/common';
import { IJwtPayload } from '../interface';
import { AbstractGuard } from './AbstractGuard';
import { AuthService } from '../service/AuthService';

@Injectable()
export class MerchantIdGuard extends AbstractGuard {
    constructor(authService: AuthService) {
        super(authService);
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            const targetId: string = context.getArgByIndex<string>(1).split(':')[1];
            const { merchantId }: IJwtPayload = await this.decodeJwtToken(context);

            return targetId === merchantId;
        } catch (e) {
            return false;
        }
    }
}
