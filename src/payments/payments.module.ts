import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller';
import { PaymentService } from './services/payment.service';
import { PaymentProviderFactory } from './services/payment-provider.factory';
import { PaymentMetricsService } from './services/payment-metrics.service';
import { DockModule } from '../dock/dock.module';
import { ProvedorXModule } from '../provedor-x/provedor-x.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [DockModule, ProvedorXModule, AuthModule],
  controllers: [PaymentsController],
  providers: [PaymentService, PaymentProviderFactory, PaymentMetricsService],
})
export class PaymentsModule {} 