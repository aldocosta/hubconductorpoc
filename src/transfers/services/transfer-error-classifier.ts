export class TransferErrorClassifier {
  static classifyError(error: any): string {
    if (error.message?.includes('provider') || error.message?.includes('timeout')) {
      return 'transfer_provider_error';
    }
    
    if (error.message?.includes('saldo') || error.message?.includes('insufficient')) {
      return 'transfer_business_error';
    }
    
    if (error.message?.includes('validation') || error.status === 400) {
      return 'transfer_validation_error';
    }
    
    if (error.status === 401 || error.status === 403) {
      return 'transfer_auth_error';
    }
    
    if (error.message?.includes('conta') || error.message?.includes('account')) {
      return 'transfer_account_error';
    }
    
    if (error.message?.includes('doc') || error.message?.includes('transfer')) {
      return 'transfer_doc_error';
    }
    
    return 'transfer_unknown_error';
  }
} 