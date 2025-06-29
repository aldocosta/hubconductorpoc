import { Injectable } from '@nestjs/common';
import { IPaymentProvider } from '../core/interfaces/payment-provider.interface';
import { PayBillRequestDto } from '../core/dto/pay-bill-request.dto';
import { PayBillResponseDto } from '../core/dto/pay-bill-response.dto';

@Injectable()
export class ProvedorXPaymentProviderService implements IPaymentProvider {
  async payBill(data: PayBillRequestDto): Promise<PayBillResponseDto> {
    // Simulação de validação de valor mínimo
    if (data.amount < 1000) { // R$ 10,00
      return {
        transactionId: `provedorx_${Date.now()}_error`,
        status: 'failed',
        message: 'Valor mínimo não atingido',
        providerId: 'provedorx',
        timestamp: new Date().toISOString(),
      };
    }

    // Simulação de processamento bem-sucedido
    return {
      transactionId: `provedorx_${Date.now()}`,
      status: 'success',
      message: 'Boleto pago com sucesso via ProvedorX',
      providerId: 'provedorx',
      timestamp: new Date().toISOString(),
    };
  }
} 