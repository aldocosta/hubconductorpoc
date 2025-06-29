"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProvedorXDocProviderService = void 0;
const common_1 = require("@nestjs/common");
let ProvedorXDocProviderService = class ProvedorXDocProviderService {
    async transferDoc(data) {
        if (data.amount > 10000000) {
            return {
                transferId: `provedorx_doc_${Date.now()}_error`,
                status: 'failed',
                message: 'Valor da transferência excede o limite permitido',
                providerId: 'provedorx',
                timestamp: new Date().toISOString(),
            };
        }
        if (data.amount > 5000000) {
            return {
                transferId: `provedorx_doc_${Date.now()}_pending`,
                status: 'pending',
                message: 'Transferência em análise - valor alto',
                providerId: 'provedorx',
                timestamp: new Date().toISOString(),
            };
        }
        return {
            transferId: `provedorx_doc_${Date.now()}`,
            status: 'success',
            message: 'Transferência DOC realizada com sucesso via ProvedorX',
            providerId: 'provedorx',
            timestamp: new Date().toISOString(),
        };
    }
};
exports.ProvedorXDocProviderService = ProvedorXDocProviderService;
exports.ProvedorXDocProviderService = ProvedorXDocProviderService = __decorate([
    (0, common_1.Injectable)()
], ProvedorXDocProviderService);
//# sourceMappingURL=provedor-x-doc-provider.service.js.map