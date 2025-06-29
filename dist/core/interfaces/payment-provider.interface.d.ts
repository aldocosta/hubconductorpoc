import { PayBillRequestDto } from '../dto/pay-bill-request.dto';
import { PayBillResponseDto } from '../dto/pay-bill-response.dto';
export interface IPaymentProvider {
    payBill(data: PayBillRequestDto): Promise<PayBillResponseDto>;
}
