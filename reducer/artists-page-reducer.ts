//* action types
import { ActionType } from '../context/action-types/action-types';

//* initial state
import { ArtistPageInitialStateType } from '../context/initial-states/artists-page-initial-state';

export const ArtistPageReducer = (
	state: ArtistPageInitialStateType,
	action: ActionType
) => {
	switch (action.type) {
		case 'SET_SINGLE_ARTIST_INFORMATION':
			return {
				...state,
				singleArtist: {
					...state?.singleArtist,
					information: action.payload,
				},
			};
		case 'SET_SINGLE_ARTIST_INFORMATION_ERROR':
			return {
				...state,
				singleArtist: {
					...state?.singleArtist,
					error: {
						...state?.singleArtist?.error,
						information: action.payload,
					},
				},
			};
		case 'SET_SINGLE_ARTIST_TOP_TRACKS':
			return {
				...state,
				singleArtist: {
					...state?.singleArtist,
					topTracks: action.payload,
				},
			};
		case 'SET_SINGLE_ARTIST_TOP_TRACKS_ERROR':
			return {
				...state,
				singleArtist: {
					...state.singleArtist,
					error: {
						...state.singleArtist.error,
						topTracks: action.payload,
					},
				},
			};
		case 'SET_ARTIST_LAST_SINGLE':
			return {
				...state,
				singleArtist: {
					...state.singleArtist,
					lastSingle: action.payload,
				},
			};
		case 'SET_ARTIST_LAST_SINGLE_ERROR':
			return {
				...state,
				singleArtist: {
					...state.singleArtist,
					error: {
						...state.singleArtist.error,
						lastSingle: action.payload,
					},
				},
			};
		case 'SET_SINGLE_ARTIST_ALBUMS':
			return {
				...state,
				singleArtist: {
					...state.singleArtist,
					albums: {
						...state.singleArtist.albums,
						data: action.payload,
					},
				},
			};
		case 'SET_SINGLE_ARTIST_ALBUMS_OFFSET':
			return {
				...state,
				singleArtist: {
					...state.singleArtist,
					albums: {
						...state.singleArtist.albums,
						offset: action.payload,
					},
				},
			};
		case 'SET_SINGLE_ARTIST_ALBUMS_TOTAL_PAGES':
			return {
				...state,
				singleArtist: {
					...state.singleArtist,
					albums: {
						...state.singleArtist.albums,
						totalPages: action.payload,
					},
				},
			};
		case 'SET_SINGLE_ARTIST_ALBUMS_ERROR':
			return {
				...state,
				singleArtist: {
					...state.singleArtist,
					error: {
						...state.singleArtist.error,
						albums: action.payload,
					},
				},
			};
		case 'SET_SINGLE_ARTIST_RELATED_ARTISTS':
			return {
				...state,
				singleArtist: {
					...state.singleArtist,
					relatedArtists: {
						...state.singleArtist.relatedArtists,
						data: action.payload,
					},
				},
			};
		case 'SET_SINGLE_ARTIST_RELATED_ARTISTS_ERROR':
			return {
				...state,
				singleArtist: {
					...state.singleArtist,
					error: {
						...state.singleArtist.error,
						relatedArtists: action.payload,
					},
				},
			};
		case 'SET_SINGLE_ARTIST_RELATED_ARTISTS_TOTAL_PAGES':
			return {
				...state,
				singleArtist: {
					...state.singleArtist,
					relatedArtists: {
						...state.singleArtist.relatedArtists,
						totalPages: action.payload,
					},
				},
			};
		default:
			return state;
	}
};
