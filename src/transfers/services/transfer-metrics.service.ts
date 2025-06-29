import { Injectable } from '@nestjs/common';
import { Counter, Histogram } from 'prom-client';

@Injectable()
export class TransferMetricsService {
  private transferCounter = new Counter({
    name: 'transfers_total',
    help: 'Total de transferências',
    labelNames: ['provider', 'status', 'error_type', 'instance']
  });

  private transferAmount = new Counter({
    name: 'transfers_amount_total',
    help: 'Valor total transferido',
    labelNames: ['provider', 'status', 'instance']
  });

  private transferDuration = new Histogram({
    name: 'transfer_duration_seconds',
    help: 'Tempo de resposta',
    labelNames: ['provider', 'status', 'instance']
  });

  recordTransfer(provider: string, status: string, amount: number, duration: number, errorType?: string, instance?: string) {
    this.transferCounter.inc({ 
      provider, 
      status, 
      error_type: errorType || 'none',
      instance: instance || 'monolith'
    });
    
    if (status === 'success') {
      this.transferAmount.inc({ provider, status, instance: instance || 'monolith' }, amount);
    }
    
    this.transferDuration.observe({ provider, status, instance: instance || 'monolith' }, duration / 1000);
  }
} 