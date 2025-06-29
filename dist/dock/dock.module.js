"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DockModule = void 0;
const common_1 = require("@nestjs/common");
const dock_payment_provider_service_1 = require("./dock-payment-provider.service");
const dock_doc_provider_service_1 = require("./dock-doc-provider.service");
let DockModule = class DockModule {
};
exports.DockModule = DockModule;
exports.DockModule = DockModule = __decorate([
    (0, common_1.Module)({
        providers: [
            dock_payment_provider_service_1.DockPaymentProviderService,
            dock_doc_provider_service_1.DockDocProviderService,
            {
                provide: 'DOCK_PROVIDER',
                useClass: dock_payment_provider_service_1.DockPaymentProviderService,
            },
            {
                provide: 'DOCK_DOC_PROVIDER',
                useClass: dock_doc_provider_service_1.DockDocProviderService,
            },
        ],
        exports: [
            dock_payment_provider_service_1.DockPaymentProviderService,
            dock_doc_provider_service_1.DockDocProviderService,
            'DOCK_PROVIDER',
            'DOCK_DOC_PROVIDER'
        ],
    })
], DockModule);
//# sourceMappingURL=dock.module.js.map