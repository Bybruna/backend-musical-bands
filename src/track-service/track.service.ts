import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import * as NodeCache from "node-cache";
import { ItunesService } from "../itunes/itunes.service";
import { SearchResult } from "src/shared/track/search-result.interface";
import { Track } from "src/shared/track/track.interface";

@Injectable()
export class TrackService {
    private readonly cache: NodeCache;

    constructor(private readonly _itunesService: ItunesService) {
        this.cache = new NodeCache({ stdTTL: 3600 });
    }

    async validateTrackByBandAndId(bandName: string, songId: number): Promise<Track | null> {
        const data = await this.searchTracksByBand(bandName);
        return data.canciones.find(track => track.cancion_id === songId) || null;
    }

    async searchTracksByBand(name: string): Promise<SearchResult> {
        const cachedData = this.getCachedData(name);
        if (cachedData) {
            return cachedData as SearchResult;
        }

        try {
            const data = await this.fetchAndFormatData(name);
            this.cacheData(name, data);
            return data;
        } catch (error) {
            console.error(error);
            throw new HttpException("Error fetching data from iTunes", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    

    private getCachedData(key: string) {
        return this.cache.get(key);
    }

    private cacheData(key: string, value: any) {
        this.cache.set(key, value);
    }

    private async fetchAndFormatData(artistName: string) {
        const data = await this._itunesService.getMusicBandsInfo(artistName);
        return this.formatResponse(data.results, artistName);
    }

    private formatResponse(results: any[], artistName: string): SearchResult {
        const tracks = results
            .filter(item => item.kind === 'song' && item.artistName === artistName)
            .slice(0, 25);

        const albums = Array.from(new Set(tracks.map(track => track.collectionName)));
        const totalAlbums = albums.length;
        const totalSongs = tracks.length;

        return {
            total_albumes: totalAlbums,
            total_canciones: totalSongs,
            albumes: albums,
            canciones: tracks.map(track => ({
                cancion_id: track.trackId,
                nombre_album: track.collectionName,
                nombre_tema: track.trackName,
                preview_url: track.previewUrl,
                fecha_lanzamiento: track.releaseDate,
                precio: {
                    valor: track.trackPrice,
                    moneda: track.currency,
                },
            })),
        };
    }
}
