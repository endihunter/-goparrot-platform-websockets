import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IJwtPayload } from '../interface';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) {}

    async getPayload(token: string): Promise<IJwtPayload> {
        return this.jwtService.decode(token) as IJwtPayload;
    }
}
