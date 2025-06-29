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
exports.PayBillResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class PayBillResponseDto {
}
exports.PayBillResponseDto = PayBillResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID da transação',
        example: 'txn_123456789'
    }),
    __metadata("design:type", String)
], PayBillResponseDto.prototype, "transactionId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Status do pagamento',
        example: 'success',
        enum: ['success', 'pending', 'failed']
    }),
    __metadata("design:type", String)
], PayBillResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Mensagem de resposta',
        example: 'Boleto pago com sucesso'
    }),
    __metadata("design:type", String)
], PayBillResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID do provedor usado para o pagamento',
        example: 'dock'
    }),
    __metadata("design:type", String)
], PayBillResponseDto.prototype, "providerId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Data e hora da transação',
        example: '2024-01-15T10:30:00Z'
    }),
    __metadata("design:type", String)
], PayBillResponseDto.prototype, "timestamp", void 0);
//# sourceMappingURL=pay-bill-response.dto.js.map