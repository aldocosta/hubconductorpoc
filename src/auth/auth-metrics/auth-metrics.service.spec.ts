import { Test, TestingModule } from '@nestjs/testing';
import { AuthMetricsService } from './auth-metrics.service';

describe('AuthMetricsService', () => {
  let service: AuthMetricsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthMetricsService],
    }).compile();

    service = module.get<AuthMetricsService>(AuthMetricsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
