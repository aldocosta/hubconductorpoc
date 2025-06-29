import { Module } from '@nestjs/common';
import { ProvedorXPaymentProviderService } from './provedor-x-payment-provider.service';
import { ProvedorXDocProviderService } from './provedor-x-doc-provider.service';

@Module({
  providers: [
    ProvedorXPaymentProviderService,
    ProvedorXDocProviderService,
    {
      provide: 'PROVEDOR_X_PROVIDER',
      useClass: ProvedorXPaymentProviderService,
    },
    {
      provide: 'PROVEDOR_X_DOC_PROVIDER',
      useClass: ProvedorXDocProviderService,
    },
  ],
  exports: [
    ProvedorXPaymentProviderService,
    ProvedorXDocProviderService,
    'PROVEDOR_X_PROVIDER', 
    'PROVEDOR_X_DOC_PROVIDER'
  ],
})
export class ProvedorXModule {} 