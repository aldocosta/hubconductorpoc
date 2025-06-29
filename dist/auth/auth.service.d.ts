import { LoginRequestDto } from './dto/login-request.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { JwtService } from '../core/services/jwt.service';
export declare class AuthService {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    login(loginData: LoginRequestDto): Promise<LoginResponseDto>;
}
