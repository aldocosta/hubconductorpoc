import { Injectable } from '@nestjs/common';
import { Counter, Histogram } from 'prom-client';

@Injectable()
export class AuthMetricsService {

    private loginCounter = new Counter({
        name: 'login_total',
        help: 'Total de Logins',
        labelNames: ['provider', 'status', 'error_type', 'instance']
      });

      private loginDuration = new Histogram({
        name: 'login_duration_seconds',
        help: 'Tempo de resposta',
        labelNames: ['provider', 'status', 'instance']
      });

      recordLogin(provider: string, status: string, duration: number, errorType?: string, instance?: string) {
        this.loginCounter.inc({ 
          provider, 
          status, 
          error_type: errorType || 'none',
          instance: instance || 'monolith'
        });

        this.loginDuration.observe({ provider, status, instance: instance || 'monolith' }, duration / 1000);
      }

}
