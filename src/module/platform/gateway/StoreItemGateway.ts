import { WebSocketGateway } from '@nestjs/websockets';
import { Events } from '../../auth/interface';
import { AbstractGateway } from './AbstractGateway';
import { GatewayOptions } from '../../auth/interface/GatewayOptions';

@WebSocketGateway({ ...GatewayOptions, namespace: 'stores' })
export class StoreItemGateway extends AbstractGateway {
    menuSyncStatusUpdate({ storeId, status }: { storeId: string; status: string }, rooms: string[]): void {
        this.logger.log(`Store #${storeId}: MenuSync status updated to ${status}.`);
        this.emit(Events.MENU_SYNC_COMPLETED, { storeId, status }, rooms);
    }
}
