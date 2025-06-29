import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { PaymentService } from './services/payment.service';
import { PayBillRequestDto } from './dto/pay-bill-request.dto';
import { PayBillResponseDto } from './dto/pay-bill-response.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PaymentMetricsService } from './services/payment-metrics.service';
import { PaymentErrorClassifier } from './services/payment-error-classifier';

@ApiTags('Payments')
@Controller('payments')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class PaymentsController {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly metricsService: PaymentMetricsService,
  ) {}

  @Post('bill')
  @ApiOperation({ summary: 'Pagar boleto' })
  @ApiResponse({ status: 201, description: 'Boleto pago com sucesso', type: PayBillResponseDto })
  async payBill(
    @Body() data: PayBillRequestDto,
    @Req() req: any,
  ): Promise<PayBillResponseDto> {
    const startTime = Date.now();
    const amount = data.amount || 0;
    const instance = process.env.INSTANCE_NAME || 'monolith';
    
    try {
      const result = await this.paymentService.payBill(data, req.user.providerId);
      
      const duration = Date.now() - startTime;
      this.metricsService.recordPayment(req.user.providerId, 'success', amount, duration, undefined, instance);
      
      return result;
    } catch (error) {
      const duration = Date.now() - startTime;
      const errorType = PaymentErrorClassifier.classifyError(error);
      
      this.metricsService.recordPayment(req.user.providerId, 'error', 0, duration, errorType, instance);
      throw error;
    }
  }
} 