import { Body, Controller, Post } from '@nestjs/common';
import { OrderGateway } from '../gateway';
import { IUpdatedOrderPayload } from '../../auth/interface';
import { Rooms } from '../../auth/interface';

@Controller('/api/v2/orders')
export class OrderController {
    constructor(private readonly gateway: OrderGateway) {}

    @Post('updated')
    updated(@Body() payload: IUpdatedOrderPayload): void {
        this.gateway.orderUpdated(payload, [Rooms.user(payload.userId), Rooms.merchant(payload.merchantId)]);
    }
}
