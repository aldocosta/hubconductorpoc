import { PaymentService } from './services/payment.service';
import { PayBillRequestDto } from '../core/dto/pay-bill-request.dto';
import { PayBillResponseDto } from '../core/dto/pay-bill-response.dto';
import { JwtService } from '../core/services/jwt.service';
export declare class PaymentsController {
    private readonly paymentService;
    private readonly jwtService;
    constructor(paymentService: PaymentService, jwtService: JwtService);
    payBill(data: PayBillRequestDto, req: any): Promise<PayBillResponseDto>;
}
