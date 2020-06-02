import { Body, Controller, Post } from '@nestjs/common';
import { Events, Rooms } from '../../auth/interface';
import { StoreItemGateway } from '../gateway';
import { EventPattern } from '@nestjs/microservices';

@Controller('/api/v2/store-items')
export class StoreItemController {
    constructor(private readonly gateway: StoreItemGateway) {}

    // a REST version of MENU_SYNC_COMPLETED event
    // @deprecated() - use microservice event instea
    @Post('sync-finished')
    async menuSyncStatusUpdateRest(@Body() payload: { storeId: string; merchantId: string; status: string }): Promise<void> {
        return this.menuSyncStatusUpdate(payload);
    }

    @EventPattern(Events.MENU_SYNC_COMPLETED)
    async menuSyncStatusUpdate({ storeId, merchantId, status }: { storeId: string; merchantId: string; status: string }): Promise<void> {
        this.gateway.menuSyncStatusUpdate({ storeId, status }, [Rooms.merchant(merchantId)]);
    }
}
