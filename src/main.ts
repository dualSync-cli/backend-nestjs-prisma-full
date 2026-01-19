import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // Security
    app.use(helmet());
    app.enableCors();

    // Validation
    app.useGlobalPipes(new ValidationPipe({
        whitelist: true,
        transform: true,
    }));

    // Swagger
    const config = new DocumentBuilder()
        .setTitle('API Documentation')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);

    const port = process.env.PORT || 3000;
    await app.listen(port);
    console.log(`🐱 NestJS + Prisma running on http://localhost:${port}`);
    console.log(`📚 Swagger docs: http://localhost:${port}/api/docs`);
}
bootstrap();
