import { Module } from "@nestjs/common";
import { ItunesService } from "./itunes.service";
import { HttpModule } from "@nestjs/axios";
import { ConfigModule } from "@nestjs/config";

@Module({
    imports: [
        HttpModule,
        ConfigModule
    ],
    providers: [ItunesService],
    exports: [ItunesService]
})
export class ItunesModule {}
