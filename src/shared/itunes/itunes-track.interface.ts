export interface ItunesTrack {
    trackId: number;
    collectionName: string;
    trackName: string;
    previewUrl: string;
    releaseDate: string;
    trackPrice: number;
    currency: string;
    artistName: string;
    kind: string;
}

export interface ItunesResponse {
    results: ItunesTrack[];
}
