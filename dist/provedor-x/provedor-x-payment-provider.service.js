"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProvedorXPaymentProviderService = void 0;
const common_1 = require("@nestjs/common");
let ProvedorXPaymentProviderService = class ProvedorXPaymentProviderService {
    async payBill(data) {
        if (data.amount < 1000) {
            return {
                transactionId: `provedorx_${Date.now()}_error`,
                status: 'failed',
                message: 'Valor mínimo não atingido',
                providerId: 'provedorx',
                timestamp: new Date().toISOString(),
            };
        }
        return {
            transactionId: `provedorx_${Date.now()}`,
            status: 'success',
            message: 'Boleto pago com sucesso via ProvedorX',
            providerId: 'provedorx',
            timestamp: new Date().toISOString(),
        };
    }
};
exports.ProvedorXPaymentProviderService = ProvedorXPaymentProviderService;
exports.ProvedorXPaymentProviderService = ProvedorXPaymentProviderService = __decorate([
    (0, common_1.Injectable)()
], ProvedorXPaymentProviderService);
//# sourceMappingURL=provedor-x-payment-provider.service.js.map