import { PayBillRequestDto } from '../../payments/dto/pay-bill-request.dto';
import { PayBillResponseDto } from '../../payments/dto/pay-bill-response.dto';

export interface IPaymentProvider {
  payBill(data: PayBillRequestDto): Promise<PayBillResponseDto>;
} 