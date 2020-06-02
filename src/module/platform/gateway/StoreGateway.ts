import { OnGatewayConnection, WebSocketGateway } from '@nestjs/websockets';
import { Events, IUpdatedStorePayload } from '../../auth/interface';
import { AbstractGateway } from './AbstractGateway';
import { GatewayOptions } from '../../auth/interface/GatewayOptions';

const fakeStorePayload: IUpdatedStorePayload = {
    storeId: '000067389048001',
    merchantId: 'ddfb5654-7fe1-40de-8be8-041116c8f2672',
};

@WebSocketGateway({ ...GatewayOptions, namespace: 'stores' })
export class StoreGateway extends AbstractGateway implements OnGatewayConnection {
    storeCreated({ storeId }: IUpdatedStorePayload, rooms: string[]): void {
        this.logger.log(`Store #${storeId} created.`);
        this.emit(Events.STORE_CREATED, { storeId }, rooms);
    }

    handleConnection(client: any, ...args: any[]): any {
        // setTimeout(() => this.storeCreated(fakeStorePayload, [Rooms.merchant(fakeStorePayload.merchantId)]), 10000);
    }
}
