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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransfersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const doc_service_1 = require("./services/doc.service");
const doc_transfer_request_dto_1 = require("./dto/doc-transfer-request.dto");
const doc_transfer_response_dto_1 = require("./dto/doc-transfer-response.dto");
const jwt_service_1 = require("../core/services/jwt.service");
let TransfersController = class TransfersController {
    constructor(docService, jwtService) {
        this.docService = docService;
        this.jwtService = jwtService;
    }
    async transferDoc(data, req) {
        const token = req.headers.authorization?.replace('Bearer ', '');
        const payload = this.jwtService.verifyToken(token);
        const providerId = payload.providerId;
        return this.docService.transferDoc(data, providerId);
    }
};
exports.TransfersController = TransfersController;
__decorate([
    (0, common_1.Post)('doc'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Realizar transferência DOC' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Transferência DOC realizada com sucesso', type: doc_transfer_response_dto_1.DocTransferResponseDto }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [doc_transfer_request_dto_1.DocTransferRequestDto, Object]),
    __metadata("design:returntype", Promise)
], TransfersController.prototype, "transferDoc", null);
exports.TransfersController = TransfersController = __decorate([
    (0, swagger_1.ApiTags)('Transfers'),
    (0, common_1.Controller)('transfers'),
    __metadata("design:paramtypes", [doc_service_1.DocService,
        jwt_service_1.JwtService])
], TransfersController);
//# sourceMappingURL=transfers.controller.js.map