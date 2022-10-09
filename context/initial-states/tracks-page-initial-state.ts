export type TrackPageInitialStateType = {
	singleTrack: {
		information: SpotifyApi.SingleTrackResponse;
		errors: {
			information: string | null;
		};
	};
};

export const TrackPageInitialState: TrackPageInitialStateType = {
	singleTrack: {
		information: {} as SpotifyApi.SingleTrackResponse,
		errors: {
			information: null,
		},
	},
};
