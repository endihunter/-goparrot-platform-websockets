export interface IJwtPayload {
    merchantId: string;
    userId: string;
    isAuthenticated: boolean;
    sub: string;
    iat: number;
}
