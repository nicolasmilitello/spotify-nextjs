//* action types
import { ActionType } from '../context/action-types/action-types';

//* initial state
import { UserLibraryPageInitialStateType } from '../context/initial-states/user-library-initial-state';

export const UserLibraryPageReducer = (
	state: UserLibraryPageInitialStateType,
	action: ActionType
) => {
	switch (action.type) {
		case 'SET_USER_LIBRARY_ALBUMS':
			return {
				...state,
				userLibrary: {
					...state.userLibrary,
					albums: {
						...state.userLibrary.albums,
						data: action.payload,
					},
				},
			};
		case 'SET_USER_LIBRARY_ALBUMS_OFFSET':
			return {
				...state,
				userLibrary: {
					...state.userLibrary,
					albums: {
						...state.userLibrary.albums,
						offset: action.payload,
					},
				},
			};
		case 'SET_USER_LIBRARY_ALBUMS_TOTAL_PAGES':
			return {
				...state,
				userLibrary: {
					...state.userLibrary,
					albums: {
						...state.userLibrary.albums,
						totalPages: action.payload,
					},
				},
			};
		case 'SET_USER_LIBRARY_ALBUMS_ERROR':
			return {
				...state,
				userLibrary: {
					...state.userLibrary,
					errors: {
						...state.userLibrary.errors,
						albums: action.payload,
					},
				},
			};
		case 'SET_USER_LIBRARY_TRACKS':
			return {
				...state,
				userLibrary: {
					...state.userLibrary,
					tracks: {
						...state.userLibrary.tracks,
						data: action.payload,
					},
				},
			};
		case 'SET_USER_LIBRARY_TRACKS_OFFSET':
			return {
				...state,
				userLibrary: {
					...state.userLibrary,
					tracks: {
						...state.userLibrary.tracks,
						offset: action.payload,
					},
				},
			};
		case 'SET_USER_LIBRARY_TRACKS_TOTAL_PAGES':
			return {
				...state,
				userLibrary: {
					...state.userLibrary,
					tracks: {
						...state.userLibrary.tracks,
						totalPages: action.payload,
					},
				},
			};
		case 'SET_USER_LIBRARY_TRACKS_ERROR':
			return {
				...state,
				userLibrary: {
					...state.userLibrary,
					errors: {
						...state.userLibrary.errors,
						tracks: action.payload,
					},
				},
			};
		default:
			return state;
	}
};
