import { Module } from '@nestjs/common';
import { Producer } from './service/Producer';

@Module({
    providers: [Producer],
})
export class FanoutModule {}
