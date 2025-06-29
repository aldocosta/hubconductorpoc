import { Module, Global } from '@nestjs/common';
import { LoggerService } from './services/logger.service';
import { MetricsService } from './services/metrics.service';

@Global()
@Module({
  providers: [LoggerService, MetricsService],
  exports: [LoggerService, MetricsService],
})
export class CoreModule {} 