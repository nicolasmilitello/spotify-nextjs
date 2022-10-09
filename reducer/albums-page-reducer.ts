//* action types
import { ActionType } from '../context/action-types/action-types';

//* initial state
import { AlbumPageInitialStateType } from '../context/initial-states/albums-page-initial-state';

export const AlbumPageReducer = (
	state: AlbumPageInitialStateType,
	action: ActionType
) => {
	switch (action.type) {
		case 'SET_SINGLE_ALBUM_INFORMATION':
			return {
				...state,
				singleAlbum: {
					...state.singleAlbum,
					information: action.payload,
				},
			};
		case 'SET_SINGLE_ALBUM_INFORMATION_ERROR':
			return {
				...state,
				singleAlbum: {
					...state.singleAlbum,
					errors: {
						...state.singleAlbum.errors,
						information: action.payload,
					},
				},
			};
		case 'SET_SINGLE_ALBUM_TRACKS':
			return {
				...state,
				singleAlbum: {
					...state.singleAlbum,
					tracks: {
						...state.singleAlbum.tracks,
						data: action.payload,
					},
				},
			};
		case 'SET_SINGLE_ALBUM_TRACKS_OFFSET':
			return {
				...state,
				singleAlbum: {
					...state.singleAlbum,
					tracks: {
						...state.singleAlbum.tracks,
						offset: action.payload,
					},
				},
			};
		case 'SET_SINGLE_ALBUM_TRACKS_TOTAL_PAGES':
			return {
				...state,
				singleAlbum: {
					...state.singleAlbum,
					tracks: {
						...state.singleAlbum.tracks,
						totalPages: action.payload,
					},
				},
			};
		case 'SET_SINGLE_ALBUM_TRACKS_ERROR':
			return {
				...state,
				singleAlbum: {
					...state.singleAlbum,
					errors: {
						...state.singleAlbum.errors,
						tracks: action.payload,
					},
				},
			};
		default:
			return state;
	}
};
