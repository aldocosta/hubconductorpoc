import { Module } from '@nestjs/common';
import { SqlServerMockService } from './services/sql-server-mock.service';
import { MongoMockService } from './services/mongo-mock.service';
import { IDatabaseService } from './interfaces/database-service.interface';

@Module({
  providers: [
    SqlServerMockService,
    MongoMockService,
    {
      provide: 'SQL_SERVER_SERVICE',
      useClass: SqlServerMockService,
    },
    {
      provide: 'MONGO_SERVICE',
      useClass: MongoMockService,
    },
  ],
  exports: ['SQL_SERVER_SERVICE', 'MONGO_SERVICE'],
})
export class DatabaseModule {} 