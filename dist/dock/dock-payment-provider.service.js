"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DockPaymentProviderService = void 0;
const common_1 = require("@nestjs/common");
let DockPaymentProviderService = class DockPaymentProviderService {
    async payBill(data) {
        if (data.amount > 1000000) {
            return {
                transactionId: `dock_${Date.now()}_error`,
                status: 'failed',
                message: 'Valor excede o limite permitido',
                providerId: 'dock',
                timestamp: new Date().toISOString(),
            };
        }
        return {
            transactionId: `dock_${Date.now()}`,
            status: 'success',
            message: 'Boleto pago com sucesso via Dock',
            providerId: 'dock',
            timestamp: new Date().toISOString(),
        };
    }
};
exports.DockPaymentProviderService = DockPaymentProviderService;
exports.DockPaymentProviderService = DockPaymentProviderService = __decorate([
    (0, common_1.Injectable)()
], DockPaymentProviderService);
//# sourceMappingURL=dock-payment-provider.service.js.map