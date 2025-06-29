import { IPaymentProvider } from '../core/interfaces/payment-provider.interface';
import { PayBillRequestDto } from '../core/dto/pay-bill-request.dto';
import { PayBillResponseDto } from '../core/dto/pay-bill-response.dto';
export declare class ProvedorXPaymentProviderService implements IPaymentProvider {
    payBill(data: PayBillRequestDto): Promise<PayBillResponseDto>;
}
