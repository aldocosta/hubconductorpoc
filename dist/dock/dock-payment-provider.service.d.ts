import { IPaymentProvider } from '../core/interfaces/payment-provider.interface';
import { PayBillRequestDto } from '../payments/dto/pay-bill-request.dto';
import { PayBillResponseDto } from '../payments/dto/pay-bill-response.dto';
export declare class DockPaymentProviderService implements IPaymentProvider {
    payBill(data: PayBillRequestDto): Promise<PayBillResponseDto>;
}
