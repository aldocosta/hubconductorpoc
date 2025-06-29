export class PaymentErrorClassifier {
  static classifyError(error: any): string {
    if (error.message?.includes('provider') || error.message?.includes('timeout')) {
      return 'payment_provider_error';
    }
    
    if (error.message?.includes('saldo') || error.message?.includes('insufficient')) {
      return 'payment_business_error';
    }
    
    if (error.message?.includes('validation') || error.status === 400) {
      return 'payment_validation_error';
    }
    
    if (error.status === 401 || error.status === 403) {
      return 'payment_auth_error';
    }
    
    if (error.message?.includes('boleto') || error.message?.includes('bill')) {
      return 'payment_bill_error';
    }
    
    return 'payment_unknown_error';
  }
} 