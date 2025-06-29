import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtService } from '../core/services/jwt.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthMetricsService } from './auth-metrics/auth-metrics.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtService, JwtAuthGuard, AuthMetricsService],
  exports: [JwtService, JwtAuthGuard],
})
export class AuthModule {} 