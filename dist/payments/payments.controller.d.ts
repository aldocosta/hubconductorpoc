import { PaymentService } from './services/payment.service';
import { PayBillRequestDto } from './dto/pay-bill-request.dto';
import { PayBillResponseDto } from './dto/pay-bill-response.dto';
import { PaymentMetricsService } from './services/payment-metrics.service';
export declare class PaymentsController {
    private readonly paymentService;
    private readonly metricsService;
    constructor(paymentService: PaymentService, metricsService: PaymentMetricsService);
    payBill(data: PayBillRequestDto, req: any): Promise<PayBillResponseDto>;
}
