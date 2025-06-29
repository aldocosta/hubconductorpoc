import { ApiProperty } from '@nestjs/swagger';

export class PayBillResponseDto {
  @ApiProperty({
    description: 'ID da transação',
    example: 'txn_123456789'
  })
  transactionId: string;

  @ApiProperty({
    description: 'Status do pagamento',
    example: 'success',
    enum: ['success', 'pending', 'failed']
  })
  status: string;

  @ApiProperty({
    description: 'Mensagem de resposta',
    example: 'Boleto pago com sucesso'
  })
  message: string;

  @ApiProperty({
    description: 'ID do provedor usado para o pagamento',
    example: 'dock'
  })
  providerId: string;

  @ApiProperty({
    description: 'Data e hora da transação',
    example: '2024-01-15T10:30:00Z'
  })
  timestamp: string;
} 