import { Module } from '@nestjs/common';
import { AuthService } from './service/AuthService';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        JwtModule.register({
            secret: process.env.JWT_TOKEN_SECRET,
        }),
    ],
    providers: [AuthService],
    exports: [AuthService],
})
export class AuthModule {}
