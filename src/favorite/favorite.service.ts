import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Favorite } from "src/database/entities/favorite.entity";
import { TrackService } from "src/track-service/track.service";
import { Repository } from "typeorm";
import { FavoriteDTO } from "./dto/favorite.dto";

@Injectable()
export class FavoriteService {

    constructor(
        @InjectRepository(Favorite)
        private readonly _favoriteRepository: Repository<Favorite>,
        private readonly _trackService: TrackService
    ) { }

    async markAsFavorite(favoriteDTO: FavoriteDTO) {
        try {
            const track = await this._trackService.validateTrackByBandAndId(favoriteDTO.bandName, favoriteDTO.songId);
            if (!track) {
                throw new HttpException("The song or band is not valid", HttpStatus.BAD_REQUEST);
            }

            const favorite = this._favoriteRepository.create(favoriteDTO);
            return await this._favoriteRepository.save(favorite);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getFavorites() {
        return await this._favoriteRepository.find();
    }
}
