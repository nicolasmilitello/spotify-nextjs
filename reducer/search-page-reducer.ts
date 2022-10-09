//* action types
import { ActionType } from '../context/action-types/action-types';

//* initial state
import { SearchPageInitialStateType } from '../context/initial-states/search-page-initial-state';

export const SearchPageReducer = (
	state: SearchPageInitialStateType,
	action: ActionType
) => {
	switch (action.type) {
		case 'SET_SEARCH_ARTIST_RESULTS':
			return {
				...state,
				search: {
					...state.search,
					artists: {
						...state.search.artists,
						data: action.payload,
					},
				},
			};
		case 'SET_SEARCH_ARTIST_RESULTS_OFFSET':
			return {
				...state,
				search: {
					...state.search,
					artists: {
						...state.search.artists,
						offset: action.payload,
					},
				},
			};
		case 'SET_SEARCH_ARTIST_RESULTS_TOTAL_PAGES':
			return {
				...state,
				search: {
					...state.search,
					artists: {
						...state.search.artists,
						totalPages: action.payload,
					},
				},
			};
		case 'SET_SEARCH_ARTIST_RESULTS_ERROR':
			return {
				...state,
				search: {
					...state.search,
					errors: {
						...state.search.errors,
						artists: action.payload,
					},
				},
			};
		case 'SET_SEARCH_ALBUM_RESULTS': {
			return {
				...state,
				search: {
					...state.search,
					albums: {
						...state.search.albums,
						data: action.payload,
					},
				},
			};
		}
		case 'SET_SEARCH_ALBUM_RESULTS_OFFSET':
			return {
				...state,
				search: {
					...state.search,
					albums: {
						...state.search.albums,
						offset: action.payload,
					},
				},
			};
		case 'SET_SEARCH_ALBUM_RESULTS_TOTAL_PAGES':
			return {
				...state,
				search: {
					...state.search,
					albums: {
						...state.search.albums,
						totalPages: action.payload,
					},
				},
			};
		case 'SET_SEARCH_ALBUM_RESULTS_ERROR':
			return {
				...state,
				search: {
					...state.search,
					errors: {
						...state.search.errors,
						albums: action.payload,
					},
				},
			};
		case 'SET_SEARCH_TRACK_RESULTS': {
			return {
				...state,
				search: {
					...state.search,
					tracks: {
						...state.search.tracks,
						data: action.payload,
					},
				},
			};
		}
		case 'SET_SEARCH_TRACK_RESULTS_OFFSET':
			return {
				...state,
				search: {
					...state.search,
					tracks: {
						...state.search.tracks,
						offset: action.payload,
					},
				},
			};
		case 'SET_SEARCH_TRACK_RESULTS_TOTAL_PAGES':
			return {
				...state,
				search: {
					...state.search,
					tracks: {
						...state.search.tracks,
						totalPages: action.payload,
					},
				},
			};
		case 'SET_SEARCH_TRACK_RESULTS_ERROR':
			return {
				...state,
				search: {
					...state.search,
					errors: {
						...state.search.errors,
						tracks: action.payload,
					},
				},
			};
		case 'CLEAR_SEARCH_RESULTS':
			return {
				...state,
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
		default:
			return state;
	}
};
