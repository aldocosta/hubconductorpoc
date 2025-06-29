import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginRequestDto } from './dto/login-request.dto';
import { LoginResponseDto } from './dto/login-response.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Fazer login' })
  @ApiResponse({ status: 201, description: 'Login realizado com sucesso', type: LoginResponseDto })
  @ApiResponse({ 
    status: 401, 
    description: 'Credenciais inválidas' 
  })
  async login(@Body() loginData: LoginRequestDto): Promise<LoginResponseDto> {
    try {
      return await this.authService.login(loginData);
    } catch (error) {
      throw new HttpException(
        'Credenciais inválidas',
        HttpStatus.UNAUTHORIZED
      );
    }
  }
} 