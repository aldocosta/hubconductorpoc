import { Controller, Post, Body, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { PaymentService } from './services/payment.service';
import { PayBillRequestDto } from '../core/dto/pay-bill-request.dto';
import { PayBillResponseDto } from '../core/dto/pay-bill-response.dto';
import { JwtService } from '../core/services/jwt.service';

@ApiTags('Payments')
@Controller('payments')
export class PaymentsController {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('bill')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Pagar boleto' })
  @ApiResponse({ status: 201, description: 'Boleto pago com sucesso', type: PayBillResponseDto })
  async payBill(
    @Body() data: PayBillRequestDto,
    @Req() req: any,
  ): Promise<PayBillResponseDto> {
    const token = req.headers.authorization?.replace('Bearer ', '');
    const payload = this.jwtService.verifyToken(token);
    const providerId = payload.providerId;
    
    return this.paymentService.payBill(data, providerId);
  }
} 