import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtService } from '../core/services/jwt.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtService, JwtAuthGuard],
  exports: [JwtService, JwtAuthGuard],
})
export class AuthModule {} 