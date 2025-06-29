import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './core/filters/http-exception.filter';
import { LoggerService } from './core/services/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new LoggerService(),
  });

  // Configuração de validação global
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  // Filtro global de exceção
  app.useGlobalFilters(new HttpExceptionFilter());

  // Configuração do CORS
  app.enableCors();

  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('Hubconductor API')
    .setDescription('PoC de monolito modular em NestJS para sistema de pagamento de boletos')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  
  console.log(`🚀 Hubconductor API rodando na porta ${port}`);
  console.log(`📚 Documentação Swagger disponível em: http://localhost:${port}/api`);
}

bootstrap(); 