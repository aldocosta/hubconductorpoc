import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class PayBillRequestDto {
  @ApiProperty({
    description: 'Código de barras do boleto',
    example: '12345678901234567890123456789012345678901234'
  })
  @IsString()
  @IsNotEmpty()
  barcode: string;

  @ApiProperty({
    description: 'Valor do boleto em centavos',
    example: 15000
  })
  @IsNumber()
  amount: number;

  @ApiProperty({
    description: 'Data de vencimento do boleto',
    example: '2024-12-31'
  })
  @IsString()
  @IsNotEmpty()
  dueDate: string;

  @ApiProperty({
    description: 'CPF/CNPJ do pagador',
    example: '12345678901'
  })
  @IsString()
  @IsNotEmpty()
  payerDocument: string;

  @ApiProperty({
    description: 'Nome do pagador',
    example: 'João Silva'
  })
  @IsString()
  @IsNotEmpty()
  payerName: string;
} 