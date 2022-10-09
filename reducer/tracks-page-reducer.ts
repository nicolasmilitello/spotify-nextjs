//* action types
import { ActionType } from '../context/action-types/action-types';

//* initial state
import { TrackPageInitialStateType } from '../context/initial-states/tracks-page-initial-state';

export const TrackPageReducer = (
	state: TrackPageInitialStateType,
	action: ActionType
) => {
	switch (action.type) {
		case 'SET_SINGLE_TRACK_INFORMATION':
			return {
				...state,
				singleTrack: {
					...state.singleTrack,
					information: action.payload,
				},
			};
		case 'SET_SINGLE_TRACK_INFORMATION_ERROR':
			return {
				...state,
				singleTrack: {
					...state.singleTrack,
					errors: {
						...state.singleTrack.errors,
						information: action.payload,
					},
				},
			};
		default:
			return state;
	}
};
