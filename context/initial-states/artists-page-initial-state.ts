export type ArtistPageInitialStateType = {
	singleArtist: {
		information: SpotifyApi.SingleArtistResponse;
		topTracks: SpotifyApi.TrackObjectFull[];
		albums: {
			data: SpotifyApi.AlbumObjectSimplified[];
			offset: number;
			totalPages: number;
		};
		lastSingle: SpotifyApi.AlbumObjectSimplified[];
		relatedArtists: {
			data: SpotifyApi.ArtistObjectFull[];
			totalPages: number;
		};
		error: {
			information: string | null;
			topTracks: string | null;
			albums: string | null;
			lastSingle: string | null;
			relatedArtists: string | null;
		};
	};
};

export const ArtistPageInitialState: ArtistPageInitialStateType = {
	singleArtist: {
		information: {} as SpotifyApi.SingleArtistResponse,
		topTracks: [],
		albums: {
			data: [],
			offset: 0,
			totalPages: 0,
		},
		lastSingle: [],
		relatedArtists: {
			data: [],
			totalPages: 0,
		},
		error: {
			information: null,
			topTracks: null,
			albums: null,
			lastSingle: null,
			relatedArtists: null,
		},
	},
};
