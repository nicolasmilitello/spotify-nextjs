import singleTrackResponse from '../../mocks/single-track-response.json';
import { TrackPageReducer } from '../tracks-page-reducer';

describe('The reducer for the Track Page', () => {
	const initialState = {
		singleTrack: {
			information: {} as SpotifyApi.SingleTrackResponse,
			errors: {
				information: null,
			},
		},
	};

	it('should add the track information', () => {
		const actionToDispatch = {
			type: 'SET_SINGLE_TRACK_INFORMATION' as const,
			payload: singleTrackResponse as SpotifyApi.SingleTrackResponse,
		};

		const updatedState = TrackPageReducer(initialState, actionToDispatch);

		expect(updatedState.singleTrack.information).toEqual(
			singleTrackResponse
		);
	});

	it('should add an error', () => {
		const errorMessage = 'error';

		const actionToDispatch = {
			type: 'SET_SINGLE_TRACK_INFORMATION_ERROR' as const,
			payload: errorMessage,
		};

		const updatedState = TrackPageReducer(initialState, actionToDispatch);

		expect(updatedState.singleTrack.errors.information).toEqual(
			errorMessage
		);
	});
});
