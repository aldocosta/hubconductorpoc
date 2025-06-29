import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller';
import { PaymentService } from './services/payment.service';
import { PaymentProviderFactory } from './services/payment-provider.factory';
import { DockModule } from '../dock/dock.module';
import { ProvedorXModule } from '../provedor-x/provedor-x.module';
import { CoreModule } from '../core/core.module';

@Module({
  imports: [DockModule, ProvedorXModule, CoreModule],
  controllers: [PaymentsController],
  providers: [PaymentService, PaymentProviderFactory],
})
export class PaymentsModule {} 