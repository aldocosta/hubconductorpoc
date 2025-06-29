"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocProviderFactory = void 0;
const common_1 = require("@nestjs/common");
const dock_doc_provider_service_1 = require("../../dock/dock-doc-provider.service");
const provedor_x_doc_provider_service_1 = require("../../provedor-x/provedor-x-doc-provider.service");
let DocProviderFactory = class DocProviderFactory {
    constructor(dockProvider, provedorXProvider) {
        this.dockProvider = dockProvider;
        this.provedorXProvider = provedorXProvider;
    }
    createProvider(providerId) {
        switch (providerId.toLowerCase()) {
            case 'dock':
                return this.dockProvider;
            case 'provedorx':
                return this.provedorXProvider;
            default:
                throw new Error(`Provider não suportado: ${providerId}`);
        }
    }
};
exports.DocProviderFactory = DocProviderFactory;
exports.DocProviderFactory = DocProviderFactory = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [dock_doc_provider_service_1.DockDocProviderService,
        provedor_x_doc_provider_service_1.ProvedorXDocProviderService])
], DocProviderFactory);
//# sourceMappingURL=doc-provider.factory.js.map