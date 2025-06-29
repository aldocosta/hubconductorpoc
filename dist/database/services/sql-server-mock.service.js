"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SqlServerMockService = void 0;
const common_1 = require("@nestjs/common");
let SqlServerMockService = class SqlServerMockService {
    constructor() {
        this.mockData = new Map();
    }
    async save(collection, data) {
        if (!this.mockData.has(collection)) {
            this.mockData.set(collection, new Map());
        }
        const id = `sql_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const record = { id, ...data, createdAt: new Date().toISOString() };
        this.mockData.get(collection).set(id, record);
        console.log(`[SQL Server Mock] Saved to ${collection}:`, record);
        return record;
    }
    async findById(collection, id) {
        const collectionData = this.mockData.get(collection);
        if (!collectionData) {
            return null;
        }
        const record = collectionData.get(id);
        console.log(`[SQL Server Mock] Found in ${collection}:`, record);
        return record || null;
    }
    async update(collection, id, data) {
        const collectionData = this.mockData.get(collection);
        if (!collectionData || !collectionData.has(id)) {
            return null;
        }
        const existingRecord = collectionData.get(id);
        const updatedRecord = { ...existingRecord, ...data, updatedAt: new Date().toISOString() };
        collectionData.set(id, updatedRecord);
        console.log(`[SQL Server Mock] Updated in ${collection}:`, updatedRecord);
        return updatedRecord;
    }
    async delete(collection, id) {
        const collectionData = this.mockData.get(collection);
        if (!collectionData || !collectionData.has(id)) {
            return false;
        }
        const deleted = collectionData.delete(id);
        console.log(`[SQL Server Mock] Deleted from ${collection}: ${id}`);
        return deleted;
    }
};
exports.SqlServerMockService = SqlServerMockService;
exports.SqlServerMockService = SqlServerMockService = __decorate([
    (0, common_1.Injectable)()
], SqlServerMockService);
//# sourceMappingURL=sql-server-mock.service.js.map