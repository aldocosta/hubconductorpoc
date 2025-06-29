"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProvedorXModule = void 0;
const common_1 = require("@nestjs/common");
const provedor_x_payment_provider_service_1 = require("./provedor-x-payment-provider.service");
const provedor_x_doc_provider_service_1 = require("./provedor-x-doc-provider.service");
let ProvedorXModule = class ProvedorXModule {
};
exports.ProvedorXModule = ProvedorXModule;
exports.ProvedorXModule = ProvedorXModule = __decorate([
    (0, common_1.Module)({
        providers: [
            provedor_x_payment_provider_service_1.ProvedorXPaymentProviderService,
            provedor_x_doc_provider_service_1.ProvedorXDocProviderService,
            {
                provide: 'PROVEDOR_X_PROVIDER',
                useClass: provedor_x_payment_provider_service_1.ProvedorXPaymentProviderService,
            },
            {
                provide: 'PROVEDOR_X_DOC_PROVIDER',
                useClass: provedor_x_doc_provider_service_1.ProvedorXDocProviderService,
            },
        ],
        exports: [
            provedor_x_payment_provider_service_1.ProvedorXPaymentProviderService,
            provedor_x_doc_provider_service_1.ProvedorXDocProviderService,
            'PROVEDOR_X_PROVIDER',
            'PROVEDOR_X_DOC_PROVIDER'
        ],
    })
], ProvedorXModule);
//# sourceMappingURL=provedor-x.module.js.map