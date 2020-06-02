import { Module } from '@nestjs/common';
import { OrderController, StoreController, StoreItemController } from './controller';
import { OrderGateway, StoreGateway, StoreItemGateway } from './gateway';
import { AuthModule } from '../auth/AuthModule';

@Module({
    imports: [AuthModule],
    controllers: [OrderController, StoreController, StoreItemController],
    providers: [OrderGateway, StoreGateway, StoreItemGateway],
})
export class PlatformModule {}
