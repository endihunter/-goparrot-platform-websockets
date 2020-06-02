import { SubscribeMessage, WebSocketServer } from '@nestjs/websockets';
import { Logger, UseGuards } from '@nestjs/common';
import { MerchantIdGuard, UserIdGuard } from '../../auth/guard';
import { Events } from '../../auth/interface';
import { Server, Socket } from 'socket.io';

export class AbstractGateway {
    @WebSocketServer() protected readonly wss: Server;
    protected readonly logger: Logger = new Logger(this.constructor.name);

    @UseGuards(UserIdGuard)
    @SubscribeMessage('joinUserRoom')
    userRoom(client: Socket, room: string): void {
        client.join(room);
    }

    @UseGuards(MerchantIdGuard)
    @SubscribeMessage('joinMerchantRoom')
    merchantRoom(client: Socket, room: string): void {
        client.join(room);
    }

    emit(event: Events, payload: Record<string, any>, rooms: string[]): void {
        if (!rooms.length) {
            this.wss.emit(event, payload);
            return;
        }

        for (const room of rooms) {
            this.wss.to(room).emit(event, { ...payload, room: room });
        }
    }
}
