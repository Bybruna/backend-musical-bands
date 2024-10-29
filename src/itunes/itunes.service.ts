import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { firstValueFrom } from "rxjs";
import { ItunesResponse } from "src/shared/itunes/itunes-track.interface";

@Injectable()
export class ItunesService {

    constructor(
        private readonly _httpService: HttpService,
        private readonly _configService: ConfigService,
    ) { }

    async getMusicBandsInfo(name: string): Promise<ItunesResponse> {
        try {
            const url = `${this._configService.get('ITUNES_API')}/search?term=${name}`;
            const response = await firstValueFrom(this._httpService.get(url));

            return response.data as ItunesResponse;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}
