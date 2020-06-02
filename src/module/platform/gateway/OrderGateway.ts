import { OnGatewayConnection, SubscribeMessage, WebSocketGateway, WsResponse } from '@nestjs/websockets';
import { Events, IUpdatedOrderPayload } from '../../auth/interface';
import { AbstractGateway } from './AbstractGateway';
import { v4 as uuid } from 'uuid';
import { GatewayOptions } from '../../auth/interface/GatewayOptions';
import { Socket } from 'socket.io';
import { Payload } from '@nestjs/microservices';

const fakeOrderPayload: IUpdatedOrderPayload = {
    orderId: uuid(),
    userId: '000067389048001',
    merchantId: 'ddfb5654-7fe1-40de-8be8-041116c8f267',
};

@WebSocketGateway({ ...GatewayOptions, namespace: 'orders' })
export class OrderGateway extends AbstractGateway implements OnGatewayConnection {
    @SubscribeMessage('analytics')
    clientToServer(client: Socket, @Payload() { action }: { action: string }): WsResponse<string> {
        this.logger.log(`Analytics action: ${action}`);

        // do backend logic stuff...

        return {
            event: 'ANALYTICS_RESPONSE',
            data: action + '-' + Math.random(),
        };
    }

    orderUpdated({ orderId, status }: IUpdatedOrderPayload, rooms: string[]): void {
        this.logger.log(`Order #${orderId} status updated to ${status}.`);
        this.emit(Events.ORDER_UPDATED, { orderId, status }, rooms);
    }

    handleConnection(client: any, ...args: any[]): any {
        // setTimeout(() => this.orderUpdated(fakeOrderPayload, [Rooms.user(fakeOrderPayload.userId)]), 6000);
        // setTimeout(() => this.orderUpdated(fakeOrderPayload, [Rooms.merchant(fakeOrderPayload.merchantId)]), 12000);
    }
}
