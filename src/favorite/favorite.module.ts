import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Favorite } from "../database/entities/favorite.entity";
import { FavoriteService } from "./favorite.service";
import { FavoriteController } from "./favorite.controller";
import { TrackServiceModule } from "../track-service/track-service.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Favorite,
        ]),
        TrackServiceModule
    ],
    providers: [FavoriteService],
    controllers: [FavoriteController],
})
export class FavoriteModule { }
