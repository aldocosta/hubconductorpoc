import { Module } from '@nestjs/common';
import { TransfersController } from './transfers.controller';
import { DocService } from './services/doc.service';
import { DocProviderFactory } from './services/doc-provider.factory';
import { DockModule } from '../dock/dock.module';
import { ProvedorXModule } from '../provedor-x/provedor-x.module';
import { AuthModule } from '../auth/auth.module';
import { CoreModule } from '../core/core.module';

@Module({
  imports: [DockModule, ProvedorXModule, AuthModule, CoreModule],
  controllers: [TransfersController],
  providers: [DocService, DocProviderFactory],
})
export class TransfersModule {} 