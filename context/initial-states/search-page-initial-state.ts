export type SearchPageInitialStateType = {
	search: {
		artists: {
			data: SpotifyApi.ArtistObjectFull[] | undefined;
			offset: number | undefined;
			totalPages: number | undefined;
		};
		albums: {
			data: SpotifyApi.AlbumObjectSimplified[] | undefined;
			offset: number | undefined;
			totalPages: number | undefined;
		};
		tracks: {
			data: SpotifyApi.TrackObjectFull[] | undefined;
			offset: number | undefined;
			totalPages: number | undefined;
		};
		errors: {
			artists: string | null;
			albums: string | null;
			tracks: string | null;
		};
	};
};

export const SearchPageInitialState: SearchPageInitialStateType = {
	search: {
		artists: {
			data: [],
			offset: 0,
			totalPages: 0,
		},
		albums: {
			data: [],
			offset: 0,
			totalPages: 0,
		},
		tracks: {
			data: [],
			offset: 0,
			totalPages: 0,
		},
		errors: {
			artists: null,
			albums: null,
			tracks: null,
		},
	},
};
