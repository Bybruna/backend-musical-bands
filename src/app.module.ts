import { Module } from "@nestjs/common";
import { ItunesModule } from "./itunes/itunes.module";
import { TrackServiceModule } from "./track-service/track-service.module";
import { ConfigModule } from "@nestjs/config";
import { DatabaseModule } from "./database/database.module";
import { FavoriteModule } from './favorite/favorite.module';

@Module({
  imports: [
    ItunesModule,
    TrackServiceModule,
    ConfigModule.forRoot(),
    DatabaseModule,
    FavoriteModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
