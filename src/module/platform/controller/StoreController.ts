import { Body, Controller, Post } from '@nestjs/common';
import { StoreGateway } from '../gateway';
import { IUpdatedStorePayload, Rooms } from '../../auth/interface';

@Controller('/api/v2/stores')
export class StoreController {
    constructor(private readonly gateway: StoreGateway) {}

    @Post('created')
    created(@Body() payload: IUpdatedStorePayload): void {
        this.gateway.storeCreated(payload, [Rooms.merchant(payload.merchantId)]);
    }
}
