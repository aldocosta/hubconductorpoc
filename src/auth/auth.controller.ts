import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginRequestDto } from './dto/login-request.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { AuthMetricsService } from './auth-metrics/auth-metrics.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
     private readonly authMetricsService: AuthMetricsService) {}

  @Post('login')
  @ApiOperation({ summary: 'Fazer login' })
  @ApiResponse({ status: 201, description: 'Login realizado com sucesso', type: LoginResponseDto })
  @ApiResponse({ 
    status: 401, 
    description: 'Credenciais inválidas' 
  })
  async login(@Body() loginData: LoginRequestDto): Promise<LoginResponseDto> {
    try {
      const loginResponse = await this.authService.login(loginData);
      this.authMetricsService.recordLogin(loginResponse.providerId, 'success', 100);
      return loginResponse;
    } catch (error) {
      this.authMetricsService.recordLogin(loginData.providerId, 'error', 100);
      throw new HttpException(
        'Credenciais inválidas',
        HttpStatus.UNAUTHORIZED
      );
    }
  }
} 