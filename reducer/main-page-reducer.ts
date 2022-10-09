//* action types
import { ActionType } from '../context/action-types/action-types';

//* initial state
import { MainPageInitialStateType } from '../context/initial-states/main-page-initial-state';

export const MainPageReducer = (
	state: MainPageInitialStateType,
	action: ActionType
) => {
	switch (action.type) {
		case 'SET_FEATURED_PLAYLISTS':
			return {
				...state,
				featuredPlaylists: {
					...state.featuredPlaylists,
					data: action.payload,
				},
			};
		case 'SET_FEATURED_PLAYLISTS_OFFSET':
			return {
				...state,
				featuredPlaylists: {
					...state.featuredPlaylists,
					offset: action.payload,
				},
			};
		case 'SET_FEATURED_PLAYLISTS_TOTAL_PAGES':
			return {
				...state,
				featuredPlaylists: {
					...state.featuredPlaylists,
					totalPages: action.payload,
				},
			};
		case 'SET_FEATURED_PLAYLISTS_ERROR':
			return {
				...state,
				errors: {
					...state.errors,
					featuredPlaylists: action.payload,
				},
			};
		case 'SET_NEW_ALBUMS_RELEASES':
			return {
				...state,
				newAlbumReleases: {
					...state.newAlbumReleases,
					data: action.payload,
				},
			};
		case 'SET_NEW_ALBUMS_RELEASES_OFFSET':
			return {
				...state,
				newAlbumReleases: {
					...state.newAlbumReleases,
					offset: action.payload,
				},
			};
		case 'SET_NEW_ALBUMS_RELEASES_TOTAL_PAGES':
			return {
				...state,
				newAlbumReleases: {
					...state.newAlbumReleases,
					totalPages: action.payload,
				},
			};
		case 'SET_NEW_ALBUMS_RELEASES_ERROR':
			return {
				...state,
				errors: {
					...state.errors,
					newAlbumReleases: action.payload,
				},
			};
		case 'SET_CATEGORIES':
			return {
				...state,
				categories: {
					...state.categories,
					data: action.payload,
				},
			};
		case 'SET_CATEGORIES_OFFSET':
			return {
				...state,
				categories: {
					...state.categories,
					offset: action.payload,
				},
			};
		case 'SET_CATEGORIES_TOTAL_PAGES':
			return {
				...state,
				categories: {
					...state.categories,
					totalPages: action.payload,
				},
			};
		case 'SET_CATEGORIES_ERROR':
			return {
				...state,
				errors: {
					...state.errors,
					categories: action.payload,
				},
			};
		default:
			return state;
	}
};
