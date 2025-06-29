import { Injectable } from '@nestjs/common';
import { PaymentProviderFactory } from './payment-provider.factory';
import { PayBillRequestDto } from '../../core/dto/pay-bill-request.dto';
import { PayBillResponseDto } from '../../core/dto/pay-bill-response.dto';

@Injectable()
export class PaymentService {
  constructor(private readonly providerFactory: PaymentProviderFactory) {}

  async payBill(data: PayBillRequestDto, providerId: string): Promise<PayBillResponseDto> {
    const provider = this.providerFactory.createProvider(providerId);
    return await provider.payBill(data);
  }
} 