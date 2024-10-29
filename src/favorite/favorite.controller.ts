import { Body, Controller, Get, HttpException, HttpStatus, Post } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { FavoriteService } from "./favorite.service";
import { FavoriteDTO } from "./dto/favorite.dto";

@Controller("favorite")
@ApiTags("Favorite")
export class FavoriteController {

    constructor(
        private readonly favoriteService: FavoriteService
    ) { }

    @Post()
    @ApiResponse({ status: 201, description: "Favorites added successfully" })
    @ApiResponse({ status: 500, description: "Internal Server Error" })
    async markAsFavorite(@Body() favoriteDTO: FavoriteDTO) {
        try {
            return await this.favoriteService.markAsFavorite(favoriteDTO);
        } catch (error) {
            throw new HttpException("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get()
    @ApiResponse({ status: 200, description: "Favorites obtained successfully" })
    @ApiResponse({ status: 500, description: "Internal Server Error" })
    async getAllFavorites() {
        try {
            return await this.favoriteService.getFavorites();
        } catch (error) {
            throw new HttpException("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
