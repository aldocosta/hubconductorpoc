export class ErrorClassifier {
  static classifyError(error: any): string {
    if (error.message?.includes('provider') || error.message?.includes('timeout')) {
      return 'provider_error';
    }
    
    if (error.message?.includes('saldo') || error.message?.includes('insufficient')) {
      return 'business_error';
    }
    
    if (error.message?.includes('validation') || error.status === 400) {
      return 'validation_error';
    }
    
    if (error.status === 401 || error.status === 403) {
      return 'auth_error';
    }
    
    return 'unknown_error';
  }
} 