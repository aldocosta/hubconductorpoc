import { Module } from '@nestjs/common';
import { TransfersController } from './transfers.controller';
import { DocService } from './services/doc.service';
import { DocProviderFactory } from './services/doc-provider.factory';
import { TransferMetricsService } from './services/transfer-metrics.service';
import { DockModule } from '../dock/dock.module';
import { ProvedorXModule } from '../provedor-x/provedor-x.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [DockModule, ProvedorXModule, AuthModule],
  controllers: [TransfersController],
  providers: [DocService, DocProviderFactory, TransferMetricsService],
})
export class TransfersModule {} 