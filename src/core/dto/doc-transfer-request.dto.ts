import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class DocTransferRequestDto {
  @ApiProperty({
    description: 'Valor da transferência em centavos',
    example: 50000
  })
  @IsNumber()
  amount: number;

  @ApiProperty({
    description: 'Banco de origem',
    example: '001'
  })
  @IsString()
  @IsNotEmpty()
  originBank: string;

  @ApiProperty({
    description: 'Agência de origem',
    example: '1234'
  })
  @IsString()
  @IsNotEmpty()
  originAgency: string;

  @ApiProperty({
    description: 'Conta de origem',
    example: '12345678'
  })
  @IsString()
  @IsNotEmpty()
  originAccount: string;

  @ApiProperty({
    description: 'Tipo da conta de origem',
    example: 'corrente',
    enum: ['corrente', 'poupanca']
  })
  @IsString()
  @IsNotEmpty()
  originAccountType: 'corrente' | 'poupanca';

  @ApiProperty({
    description: 'Banco de destino',
    example: '341'
  })
  @IsString()
  @IsNotEmpty()
  destinationBank: string;

  @ApiProperty({
    description: 'Agência de destino',
    example: '5678'
  })
  @IsString()
  @IsNotEmpty()
  destinationAgency: string;

  @ApiProperty({
    description: 'Conta de destino',
    example: '87654321'
  })
  @IsString()
  @IsNotEmpty()
  destinationAccount: string;

  @ApiProperty({
    description: 'Tipo da conta de destino',
    example: 'corrente',
    enum: ['corrente', 'poupanca']
  })
  @IsString()
  @IsNotEmpty()
  destinationAccountType: 'corrente' | 'poupanca';

  @ApiProperty({
    description: 'CPF/CNPJ do beneficiário',
    example: '12345678901'
  })
  @IsString()
  @IsNotEmpty()
  beneficiaryDocument: string;

  @ApiProperty({
    description: 'Nome do beneficiário',
    example: 'João Silva'
  })
  @IsString()
  @IsNotEmpty()
  beneficiaryName: string;

  @ApiProperty({
    description: 'Descrição da transferência',
    example: 'Pagamento de serviços'
  })
  @IsString()
  @IsOptional()
  description?: string;
} 