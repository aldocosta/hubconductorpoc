import { IPaymentProvider } from '../../core/interfaces/payment-provider.interface';
import { DockPaymentProviderService } from '../../dock/dock-payment-provider.service';
import { ProvedorXPaymentProviderService } from '../../provedor-x/provedor-x-payment-provider.service';
export declare class PaymentProviderFactory {
    private readonly dockProvider;
    private readonly provedorXProvider;
    constructor(dockProvider: DockPaymentProviderService, provedorXProvider: ProvedorXPaymentProviderService);
    createProvider(providerId: string): IPaymentProvider;
}
