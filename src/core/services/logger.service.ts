import { Injectable, LoggerService as NestLoggerService } from '@nestjs/common';

@Injectable()
export class LoggerService implements NestLoggerService {
  log(message: any, ...optionalParams: any[]) {
    console.log(JSON.stringify({ level: 'log', message, timestamp: new Date().toISOString(), ...optionalParams }));
  }
  error(message: any, ...optionalParams: any[]) {
    console.error(JSON.stringify({ level: 'error', message, timestamp: new Date().toISOString(), ...optionalParams }));
  }
  warn(message: any, ...optionalParams: any[]) {
    console.warn(JSON.stringify({ level: 'warn', message, timestamp: new Date().toISOString(), ...optionalParams }));
  }
  debug?(message: any, ...optionalParams: any[]) {
    console.debug(JSON.stringify({ level: 'debug', message, timestamp: new Date().toISOString(), ...optionalParams }));
  }
  verbose?(message: any, ...optionalParams: any[]) {
    console.info(JSON.stringify({ level: 'verbose', message, timestamp: new Date().toISOString(), ...optionalParams }));
  }
} 