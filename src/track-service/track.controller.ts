import { Controller, Get, HttpException, HttpStatus, Query } from "@nestjs/common";
import { TrackService } from "./track.service";
import { ApiResponse, ApiTags } from "@nestjs/swagger";

@Controller("tracks")
@ApiTags("Track")
export class TrackController {

    constructor(
        private readonly trackService: TrackService
    ) { }

    @Get("/searchTracks")
    @ApiResponse({ status: 200, description: "Tracks obtained successfully" })
    @ApiResponse({ status: 500, description: "Internal Server Error" })
    async searchTracks(@Query('name') name : string) {
        try {
            return await this.trackService.searchTracksByBand(name);
        } catch (error) {
            throw new HttpException("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
