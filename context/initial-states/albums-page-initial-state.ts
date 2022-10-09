export type AlbumPageInitialStateType = {
	singleAlbum: {
		information: SpotifyApi.SingleAlbumResponse;
		tracks: {
			data: SpotifyApi.TrackObjectSimplified[];
			offset: number;
			totalPages: number;
		};
		errors: {
			information: string | null;
			tracks: string | null;
		};
	};
};

export const AlbumPageInitialState: AlbumPageInitialStateType = {
	singleAlbum: {
		information: {} as SpotifyApi.SingleAlbumResponse,
		tracks: {
			data: [],
			offset: 0,
			totalPages: 0,
		},
		errors: {
			information: null,
			tracks: null,
		},
	},
};
