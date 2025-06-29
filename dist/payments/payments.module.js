"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsModule = void 0;
const common_1 = require("@nestjs/common");
const payments_controller_1 = require("./payments.controller");
const payment_service_1 = require("./services/payment.service");
const payment_provider_factory_1 = require("./services/payment-provider.factory");
const dock_module_1 = require("../dock/dock.module");
const provedor_x_module_1 = require("../provedor-x/provedor-x.module");
const auth_module_1 = require("../auth/auth.module");
let PaymentsModule = class PaymentsModule {
};
exports.PaymentsModule = PaymentsModule;
exports.PaymentsModule = PaymentsModule = __decorate([
    (0, common_1.Module)({
        imports: [dock_module_1.DockModule, provedor_x_module_1.ProvedorXModule, auth_module_1.AuthModule],
        controllers: [payments_controller_1.PaymentsController],
        providers: [payment_service_1.PaymentService, payment_provider_factory_1.PaymentProviderFactory],
    })
], PaymentsModule);
//# sourceMappingURL=payments.module.js.map