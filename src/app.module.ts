import { Module } from '@nestjs/common';
import { DockModule } from './dock/dock.module';
import { ProvedorXModule } from './provedor-x/provedor-x.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { PaymentsModule } from './payments/payments.module';
import { TransfersModule } from './transfers/transfers.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    DockModule,
    ProvedorXModule,
    DatabaseModule,
    AuthModule,
    PaymentsModule,
    TransfersModule,
    HealthModule,
  ],
})
export class AppModule {} 