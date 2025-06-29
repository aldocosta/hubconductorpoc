import { Injectable } from '@nestjs/common';
import { LoginRequestDto } from './dto/login-request.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { JwtService } from '../core/services/jwt.service';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async login(loginData: LoginRequestDto): Promise<LoginResponseDto> {
    // Simula processamento
    await new Promise(resolve => setTimeout(resolve, 50));

    // Lógica mock simples: valida email/password e retorna token
    if (loginData.email === 'admin' && loginData.password === 'admin123') {  
      const providerId = loginData.providerId || 'dock'; // Default para dock se não especificado
      
      // Gera JWT com providerId nos claims
      const accessToken = this.jwtService.generateToken({
        userId: 'user_123',
        email: loginData.email,
        providerId // ← PROVEDOR EMBUTIDO NO TOKEN
      });
      
      return {
        accessToken,
        providerId,
        message: 'Login realizado com sucesso'
      };
    }

    throw new Error('Credenciais inválidas');
  }
} 