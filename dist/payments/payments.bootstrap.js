"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const payments_module_1 = require("./payments.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(payments_module_1.PaymentsModule);
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Hubconductor Payments API')
        .setDescription('API de pagamentos do Hubconductor')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(3001);
    console.log('🚀 Payments API rodando na porta 3001');
    console.log('📚 Documentação Swagger disponível em: http://localhost:3001/api');
}
bootstrap();
//# sourceMappingURL=payments.bootstrap.js.map