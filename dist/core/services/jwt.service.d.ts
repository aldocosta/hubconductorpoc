export interface JwtPayload {
    userId: string;
    email: string;
    providerId: string;
}
export declare class JwtService {
    private readonly secretKey;
    private readonly expiresIn;
    generateToken(payload: JwtPayload): string;
    verifyToken(token: string): JwtPayload;
    getProviderIdFromToken(token: string): string;
}
