import { IsInt, IsNotEmpty, IsString, Matches } from "class-validator";

export class FavoriteDTO {

    @IsString()
    @IsNotEmpty()
    bandName: string;

    @IsInt()
    @IsNotEmpty()
    songId: number;

    @IsString()
    @IsNotEmpty()
    user: string;

    @Matches(/^[1-5]\/5$/, { message: "El ranking debe estar en formato '1-5/5'" })
    ranking: string;
}
