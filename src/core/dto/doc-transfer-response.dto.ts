import { ApiProperty } from '@nestjs/swagger';

export class DocTransferResponseDto {
  @ApiProperty({
    description: 'ID da transferência',
    example: 'doc_123456789'
  })
  transferId: string;

  @ApiProperty({
    description: 'Status da transferência',
    example: 'success',
    enum: ['success', 'pending', 'failed']
  })
  status: string;

  @ApiProperty({
    description: 'Mensagem de resposta',
    example: 'Transferência DOC realizada com sucesso'
  })
  message: string;

  @ApiProperty({
    description: 'ID do provedor usado para a transferência',
    example: 'dock'
  })
  providerId: string;

  @ApiProperty({
    description: 'Data e hora da transferência',
    example: '2024-01-15T10:30:00Z'
  })
  timestamp: string;
} 