"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const http_exception_filter_1 = require("./core/filters/http-exception.filter");
const logger_service_1 = require("./core/services/logger.service");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: new logger_service_1.LoggerService(),
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    app.useGlobalFilters(new http_exception_filter_1.HttpExceptionFilter());
    app.enableCors();
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Hubconductor API')
        .setDescription('PoC de monolito modular em NestJS para sistema de pagamento de boletos')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    const port = process.env.PORT || 3000;
    await app.listen(port);
    console.log(`🚀 Hubconductor API rodando na porta ${port}`);
    console.log(`📚 Documentação Swagger disponível em: http://localhost:${port}/api`);
}
bootstrap();
//# sourceMappingURL=main.js.map