import { PaymentProviderFactory } from './payment-provider.factory';
import { PayBillRequestDto } from '../../core/dto/pay-bill-request.dto';
import { PayBillResponseDto } from '../../core/dto/pay-bill-response.dto';
export declare class PaymentService {
    private readonly providerFactory;
    constructor(providerFactory: PaymentProviderFactory);
    payBill(data: PayBillRequestDto, providerId: string): Promise<PayBillResponseDto>;
}
