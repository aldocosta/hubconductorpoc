import { Injectable } from '@nestjs/common';
import { IPaymentProvider } from '../core/interfaces/payment-provider.interface';
import { PayBillRequestDto } from '../payments/dto/pay-bill-request.dto';
import { PayBillResponseDto } from '../payments/dto/pay-bill-response.dto';

@Injectable()
export class DockPaymentProviderService implements IPaymentProvider {
  async payBill(data: PayBillRequestDto): Promise<PayBillResponseDto> {
    // Simulação de validação de limite
    if (data.amount > 1000000) { // R$ 10.000,00
      return {
        transactionId: `dock_${Date.now()}_error`,
        status: 'failed',
        message: 'Valor excede o limite permitido',
        providerId: 'dock',
        timestamp: new Date().toISOString(),
      };
    }

    // Simulação de processamento bem-sucedido
    return {
      transactionId: `dock_${Date.now()}`,
      status: 'success',
      message: 'Boleto pago com sucesso via Dock',
      providerId: 'dock',
      timestamp: new Date().toISOString(),
    };
  }
} 