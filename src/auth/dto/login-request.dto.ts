import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class LoginRequestDto {
  @ApiProperty({
    description: 'Email do usuário',
    example: 'usuario@exemplo.com'
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Senha do usuário',
    example: 'senha123'
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: 'ID do provedor de pagamento',
    example: 'dock',
    required: false
  })
  @IsString()
  @IsOptional()
  providerId?: string;
} 