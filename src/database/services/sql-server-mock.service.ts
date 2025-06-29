import { Injectable } from '@nestjs/common';
import { IDatabaseService } from '../interfaces/database-service.interface';

@Injectable()
export class SqlServerMockService implements IDatabaseService {
  private mockData: Map<string, Map<string, any>> = new Map();

  async save(collection: string, data: any): Promise<any> {
    if (!this.mockData.has(collection)) {
      this.mockData.set(collection, new Map());
    }

    const id = `sql_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const record = { id, ...data, createdAt: new Date().toISOString() };
    
    this.mockData.get(collection)!.set(id, record);
    
    console.log(`[SQL Server Mock] Saved to ${collection}:`, record);
    return record;
  }

  async findById(collection: string, id: string): Promise<any> {
    const collectionData = this.mockData.get(collection);
    if (!collectionData) {
      return null;
    }
    
    const record = collectionData.get(id);
    console.log(`[SQL Server Mock] Found in ${collection}:`, record);
    return record || null;
  }

  async update(collection: string, id: string, data: any): Promise<any> {
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

  async delete(collection: string, id: string): Promise<boolean> {
    const collectionData = this.mockData.get(collection);
    if (!collectionData || !collectionData.has(id)) {
      return false;
    }

    const deleted = collectionData.delete(id);
    console.log(`[SQL Server Mock] Deleted from ${collection}: ${id}`);
    return deleted;
  }
} 