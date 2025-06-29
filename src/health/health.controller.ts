import { Controller, Get, Res, Query } from '@nestjs/common';
import { Response } from 'express';
import { register } from 'prom-client';

@Controller('health')
export class HealthController {
  @Get()
  check() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
  }

  @Get('metrics')
  async getMetrics(@Res() res: Response) {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
  }

  @Get('api/v1/query')
  async prometheusQuery(@Query('query') query: string, @Res() res: Response) {
    try {
      const metrics = await register.metrics();
      const lines = metrics.split('\n');
      
      const result = {
        status: 'success',
        data: {
          resultType: 'vector',
          result: []
        }
      };

      for (const line of lines) {
        if (line.includes(query) && !line.startsWith('#')) {
          const parts = line.split(' ');
          if (parts.length >= 2) {
            const metricName = parts[0];
            const value = parseFloat(parts[1]);
            
            const labels = {};
            if (metricName.includes('{')) {
              const labelMatch = metricName.match(/\{([^}]+)\}/);
              if (labelMatch) {
                const labelStr = labelMatch[1];
                labelStr.split(',').forEach(pair => {
                  const [key, value] = pair.split('=');
                  if (key && value) {
                    labels[key.trim()] = value.trim().replace(/"/g, '');
                  }
                });
              }
            }
            
            const cleanMetricName = metricName.split('{')[0];
            
            result.data.result.push({
              metric: {
                __name__: cleanMetricName,
                ...labels
              },
              value: [Date.now() / 1000, value.toString()]
            });
          }
        }
      }

      res.json(result);
    } catch (error) {
      res.status(500).json({
        status: 'error',
        error: error.message
      });
    }
  }
} 