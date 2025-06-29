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
exports.PaymentsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const payment_service_1 = require("./services/payment.service");
const pay_bill_request_dto_1 = require("../core/dto/pay-bill-request.dto");
const pay_bill_response_dto_1 = require("../core/dto/pay-bill-response.dto");
const jwt_service_1 = require("../core/services/jwt.service");
let PaymentsController = class PaymentsController {
    constructor(paymentService, jwtService) {
        this.paymentService = paymentService;
        this.jwtService = jwtService;
    }
    async payBill(data, req) {
        const token = req.headers.authorization?.replace('Bearer ', '');
        const payload = this.jwtService.verifyToken(token);
        const providerId = payload.providerId;
        return this.paymentService.payBill(data, providerId);
    }
};
exports.PaymentsController = PaymentsController;
__decorate([
    (0, common_1.Post)('bill'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Pagar boleto' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Boleto pago com sucesso', type: pay_bill_response_dto_1.PayBillResponseDto }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pay_bill_request_dto_1.PayBillRequestDto, Object]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "payBill", null);
exports.PaymentsController = PaymentsController = __decorate([
    (0, swagger_1.ApiTags)('Payments'),
    (0, common_1.Controller)('payments'),
    __metadata("design:paramtypes", [payment_service_1.PaymentService,
        jwt_service_1.JwtService])
], PaymentsController);
//# sourceMappingURL=payments.controller.js.map