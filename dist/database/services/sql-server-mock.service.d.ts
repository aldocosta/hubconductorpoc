import { IDatabaseService } from '../interfaces/database-service.interface';
export declare class SqlServerMockService implements IDatabaseService {
    private mockData;
    save(collection: string, data: any): Promise<any>;
    findById(collection: string, id: string): Promise<any>;
    update(collection: string, id: string, data: any): Promise<any>;
    delete(collection: string, id: string): Promise<boolean>;
}
