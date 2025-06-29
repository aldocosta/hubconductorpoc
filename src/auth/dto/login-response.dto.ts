import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDto {
  @ApiProperty({
    description: 'Token de acesso',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
  })
  accessToken: string;

  @ApiProperty({
    description: 'ID do provedor de pagamento associado',
    example: 'dock'
  })
  providerId: string;

  @ApiProperty({
    description: 'Mensagem de sucesso',
    example: 'Login realizado com sucesso'
  })
  message: string;
} 