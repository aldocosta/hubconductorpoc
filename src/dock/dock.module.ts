import { Module } from '@nestjs/common';
import { DockPaymentProviderService } from './dock-payment-provider.service';
import { DockDocProviderService } from './dock-doc-provider.service';

@Module({
  providers: [
    DockPaymentProviderService,
    DockDocProviderService,
    {
      provide: 'DOCK_PROVIDER',
      useClass: DockPaymentProviderService,
    },
    {
      provide: 'DOCK_DOC_PROVIDER',
      useClass: DockDocProviderService,
    },
  ],
  exports: [
    DockPaymentProviderService,
    DockDocProviderService,
    'DOCK_PROVIDER', 
    'DOCK_DOC_PROVIDER'
  ],
})
export class DockModule {} 