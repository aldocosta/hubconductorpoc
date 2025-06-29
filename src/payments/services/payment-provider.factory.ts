import { Injectable } from '@nestjs/common';
import { IPaymentProvider } from '../../core/interfaces/payment-provider.interface';
import { DockPaymentProviderService } from '../../dock/dock-payment-provider.service';
import { ProvedorXPaymentProviderService } from '../../provedor-x/provedor-x-payment-provider.service';

@Injectable()
export class PaymentProviderFactory {
  constructor(
    private readonly dockProvider: DockPaymentProviderService,
    private readonly provedorXProvider: ProvedorXPaymentProviderService,
  ) {}

  createProvider(providerId: string): IPaymentProvider {
    switch (providerId.toLowerCase()) {
      case 'dock':
        return this.dockProvider;
      case 'provedorx':
        return this.provedorXProvider;
      default:
        throw new Error(`Provider não suportado: ${providerId}`);
    }
  }
} 