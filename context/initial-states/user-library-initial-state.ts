export type UserLibraryPageInitialStateType = {
	userLibrary: {
		albums: {
			data: SpotifyApi.AlbumObjectFull[];
			offset: number;
			totalPages: number;
		};
		tracks: {
			data: SpotifyApi.TrackObjectFull[];
			offset: number;
			totalPages: number;
		};
		errors: {
			albums: string | null;
			tracks: string | null;
		};
	};
};

export const UserLibraryPageInitialState: UserLibraryPageInitialStateType = {
	userLibrary: {
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
			albums: null,
			tracks: null,
		},
	},
};
