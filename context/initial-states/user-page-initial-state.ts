export type UserPageInitialStateType = {
	userInformation: {
		information: SpotifyApi.CurrentUsersProfileResponse;
		userTopArtists: {
			data: SpotifyApi.ArtistObjectFull[];
			offset: number;
			totalPages: number;
		};
		userTopTracks: {
			data: SpotifyApi.TrackObjectFull[];
			offset: number;
			totalPages: number;
		};
		userFollowedArtists: {
			data: SpotifyApi.ArtistObjectFull[];
			after: string | undefined;
			before: (string | undefined)[];
		};
		errors: {
			information: string | null;
			userTopArtists: string | null;
			userTopTracks: string | null;
			userFollowedArtists: string | null;
		};
	};
};

export const UserPageInitialState: UserPageInitialStateType = {
	userInformation: {
		information: {} as SpotifyApi.CurrentUsersProfileResponse,
		userTopArtists: {
			data: [] as SpotifyApi.ArtistObjectFull[],
			offset: 0,
			totalPages: 0,
		},
		userTopTracks: {
			data: [] as SpotifyApi.TrackObjectFull[],
			offset: 0,
			totalPages: 0,
		},
		userFollowedArtists: {
			data: [] as SpotifyApi.ArtistObjectFull[],
			after: undefined,
			before: [undefined],
		},
		errors: {
			information: null,
			userTopArtists: null,
			userTopTracks: null,
			userFollowedArtists: null,
		},
	},
};
