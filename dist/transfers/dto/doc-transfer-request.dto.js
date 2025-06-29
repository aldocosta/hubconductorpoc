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
exports.DocTransferRequestDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class DocTransferRequestDto {
}
exports.DocTransferRequestDto = DocTransferRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Valor da transferência em centavos',
        example: 50000
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], DocTransferRequestDto.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Banco de origem',
        example: '001'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], DocTransferRequestDto.prototype, "originBank", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Agência de origem',
        example: '1234'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], DocTransferRequestDto.prototype, "originAgency", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Conta de origem',
        example: '12345678'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], DocTransferRequestDto.prototype, "originAccount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tipo da conta de origem',
        example: 'corrente',
        enum: ['corrente', 'poupanca']
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], DocTransferRequestDto.prototype, "originAccountType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Banco de destino',
        example: '341'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], DocTransferRequestDto.prototype, "destinationBank", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Agência de destino',
        example: '5678'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], DocTransferRequestDto.prototype, "destinationAgency", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Conta de destino',
        example: '87654321'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], DocTransferRequestDto.prototype, "destinationAccount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tipo da conta de destino',
        example: 'corrente',
        enum: ['corrente', 'poupanca']
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], DocTransferRequestDto.prototype, "destinationAccountType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'CPF/CNPJ do beneficiário',
        example: '12345678901'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], DocTransferRequestDto.prototype, "beneficiaryDocument", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Nome do beneficiário',
        example: 'João Silva'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], DocTransferRequestDto.prototype, "beneficiaryName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Descrição da transferência',
        example: 'Pagamento de serviços'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], DocTransferRequestDto.prototype, "description", void 0);
//# sourceMappingURL=doc-transfer-request.dto.js.map