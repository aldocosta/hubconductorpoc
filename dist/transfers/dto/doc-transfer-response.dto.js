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
exports.DocTransferResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class DocTransferResponseDto {
}
exports.DocTransferResponseDto = DocTransferResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID da transferência',
        example: 'doc_123456789'
    }),
    __metadata("design:type", String)
], DocTransferResponseDto.prototype, "transferId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Status da transferência',
        example: 'success',
        enum: ['success', 'pending', 'failed']
    }),
    __metadata("design:type", String)
], DocTransferResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Mensagem de resposta',
        example: 'Transferência DOC realizada com sucesso'
    }),
    __metadata("design:type", String)
], DocTransferResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID do provedor usado para a transferência',
        example: 'dock'
    }),
    __metadata("design:type", String)
], DocTransferResponseDto.prototype, "providerId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Data e hora da transferência',
        example: '2024-01-15T10:30:00Z'
    }),
    __metadata("design:type", String)
], DocTransferResponseDto.prototype, "timestamp", void 0);
//# sourceMappingURL=doc-transfer-response.dto.js.map