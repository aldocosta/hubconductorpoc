"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const dock_module_1 = require("./dock/dock.module");
const provedor_x_module_1 = require("./provedor-x/provedor-x.module");
const database_module_1 = require("./database/database.module");
const auth_module_1 = require("./auth/auth.module");
const payments_module_1 = require("./payments/payments.module");
const transfers_module_1 = require("./transfers/transfers.module");
const health_module_1 = require("./health/health.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            dock_module_1.DockModule,
            provedor_x_module_1.ProvedorXModule,
            database_module_1.DatabaseModule,
            auth_module_1.AuthModule,
            payments_module_1.PaymentsModule,
            transfers_module_1.TransfersModule,
            health_module_1.HealthModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map