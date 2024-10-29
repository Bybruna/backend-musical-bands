import { Module } from "@nestjs/common";
import { TrackService } from "./track.service";
import { TrackController } from "./track.controller";
import { ItunesModule } from "../itunes/itunes.module";
import { ConfigModule } from "@nestjs/config";

@Module({
    imports: [
        ItunesModule,
        ConfigModule
    ],
    providers: [TrackService],
    controllers: [TrackController],
    exports: [TrackService],
})
export class TrackServiceModule { }
