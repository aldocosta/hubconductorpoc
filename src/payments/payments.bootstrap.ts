import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { PaymentsModule } from './payments.module';

async function bootstrap() {
  const app = await NestFactory.create(PaymentsModule);
  
  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('Hubconductor Payments API')
    .setDescription('API de pagamentos do Hubconductor')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3001);
  console.log('🚀 Payments API rodando na porta 3001');
  console.log('📚 Documentação Swagger disponível em: http://localhost:3001/api');
}

bootstrap(); 