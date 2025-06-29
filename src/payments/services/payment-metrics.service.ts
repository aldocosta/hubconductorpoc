import { Injectable } from '@nestjs/common';
import { Counter, Histogram } from 'prom-client';

@Injectable()
export class PaymentMetricsService {
  private paymentCounter = new Counter({
    name: 'payments_total',
    help: 'Total de pagamentos',
    labelNames: ['provider', 'status', 'error_type', 'instance']
  });

  private paymentAmount = new Counter({
    name: 'payments_amount_total',
    help: 'Valor total transacionado',
    labelNames: ['provider', 'status', 'instance']
  });

  private paymentDuration = new Histogram({
    name: 'payment_duration_seconds',
    help: 'Tempo de resposta',
    labelNames: ['provider', 'status', 'instance']
  });

  recordPayment(provider: string, status: string, amount: number, duration: number, errorType?: string, instance?: string) {
    this.paymentCounter.inc({ 
      provider, 
      status, 
      error_type: errorType || 'none',
      instance: instance || 'monolith'
    });
    
    if (status === 'success') {
      this.paymentAmount.inc({ provider, status, instance: instance || 'monolith' }, amount);
    }
    
    this.paymentDuration.observe({ provider, status, instance: instance || 'monolith' }, duration / 1000);
  }
} 