import { Track } from "./track.interface";

export interface SearchResult {
    total_albumes: number;
    total_canciones: number;
    albumes: string[];
    canciones: Track[];
}
