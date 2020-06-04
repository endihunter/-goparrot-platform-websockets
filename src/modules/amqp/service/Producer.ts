import { Logger, LoggerService } from '@goparrot/platform-common';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { AmqpConnectionManager, ChannelWrapper } from 'amqp-connection-manager';
// tslint:disable-next-line:no-implicit-dependencies
import RabbitManager = require('amqp-connection-manager');
import { ConfirmChannel, ConsumeMessage, Options } from 'amqplib';

// @ts-ignore
@Injectable()
export class Producer implements OnModuleInit {
    @Logger()
    private readonly logger: LoggerService;

    private readonly hosts: string[] = ['amqp://gbusxwqd:HPiUF0BbN6Ut5RMMe760Xlbp3WUeitID@shark.rmq.cloudamqp.com/gbusxwqd'];
    private readonly exchangeName: string = 'fanout-test';
    private readonly queueName: string = 'loyalty-points-queue';
    private readonly publishOptions: Options.Publish = {
        deliveryMode: 2,
        contentType: 'application/json',
        expiration: 3,
    };

    async consume(onMessage: (msg: ConsumeMessage | null) => any): Promise<void> {
        this.queue(
            async (channel: ConfirmChannel): Promise<void> => {
                await channel.consume(this.queueName, onMessage, { noAck: true });
            },
        );
    }

    async produce(msg: Record<string, any>): Promise<void> {
        const producer: ChannelWrapper = this.queue();

        await producer.sendToQueue(this.queueName, msg, this.publishOptions);
    }

    async onModuleInit(): Promise<any> {
        await this.consume((msg: ConsumeMessage | null): void => {
            this.logger.debug(`Message received: ${msg?.content.toString()}`);
        });

        setTimeout(async () => {
            this.produce({
                event: 'stores:store-created',
                payload: { storeId: '3234342345' },
            })
                .then(() => {
                    this.logger.debug('sendToQueue -> OK');
                })
                .catch(this.logger.exception);
        }, 2000);
    }

    private queue(callback?: (channel: ConfirmChannel) => {}): ChannelWrapper {
        const connection: AmqpConnectionManager = RabbitManager.connect(this.hosts, {
            heartbeatIntervalInSeconds: 3,
            reconnectTimeInSeconds: 3,
        });

        return connection.createChannel({
            json: true,
            name: this.queueName,
            setup: async (channel: ConfirmChannel): Promise<any> => {
                await channel.assertExchange(this.exchangeName, 'fanout', { durable: true, autoDelete: false });
                await channel.assertQueue(this.queueName, { durable: true, autoDelete: false });
                await channel.bindQueue(this.queueName, this.exchangeName, '*');

                callback && callback(channel);
            },
        });
    }
}
