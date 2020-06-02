import { NestFactory } from '@nestjs/core';
import { AppModule } from './AppModule';
import { NestExpressApplication } from '@nestjs/platform-express';
import { RedisIoAdapter } from './module/adapter/RedisIoAdapter';
import { Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

async function bootstrap() {
    const logger: Logger = new Logger('Bootstrap');
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.useWebSocketAdapter(new RedisIoAdapter(app));
    app.connectMicroservice({
        transport: Transport.REDIS,
        options: {
            url: process.env.REDIS_PUBSUB_URL,
        },
    });
    app.startAllMicroservicesAsync().then(() => {
        logger.log('Microservices ready');
    });
    await app.listen(8181);
}

bootstrap();
