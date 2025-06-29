"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DockDocProviderService = void 0;
const common_1 = require("@nestjs/common");
let DockDocProviderService = class DockDocProviderService {
    async transferDoc(data) {
        if (data.amount > 5000000) {
            return {
                transferId: `dock_doc_${Date.now()}_error`,
                status: 'failed',
                message: 'Valor da transferência excede o limite permitido',
                providerId: 'dock',
                timestamp: new Date().toISOString(),
            };
        }
        const now = new Date();
        const hour = now.getHours();
        if (hour < 6 || hour > 18) {
            return {
                transferId: `dock_doc_${Date.now()}_pending`,
                status: 'pending',
                message: 'Transferência agendada para o próximo horário comercial',
                providerId: 'dock',
                timestamp: new Date().toISOString(),
            };
        }
        return {
            transferId: `dock_doc_${Date.now()}`,
            status: 'success',
            message: 'Transferência DOC realizada com sucesso via Dock',
            providerId: 'dock',
            timestamp: new Date().toISOString(),
        };
    }
};
exports.DockDocProviderService = DockDocProviderService;
exports.DockDocProviderService = DockDocProviderService = __decorate([
    (0, common_1.Injectable)()
], DockDocProviderService);
//# sourceMappingURL=dock-doc-provider.service.js.map