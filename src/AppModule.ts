import { Module } from '@nestjs/common';
import { PlatformModule } from './module/platform';

@Module({
    imports: [PlatformModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
