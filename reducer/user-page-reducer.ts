//* action types
import { ActionType } from '../context/action-types/action-types';

//* initial state
import { UserPageInitialStateType } from '../context/initial-states/user-page-initial-state';

export const UserPageReducer = (
	state: UserPageInitialStateType,
	action: ActionType
) => {
	switch (action.type) {
		case 'SET_USER_INFORMATION':
			return {
				...state,
				userInformation: {
					...state.userInformation,
					information: action.payload,
				},
			};
		case 'SET_USER_INFORMATION_ERROR':
			return {
				...state,
				userInformation: {
					...state.userInformation,
					errors: {
						...state.userInformation.errors,
						information: action.payload,
					},
				},
			};
		case 'SET_USER_TOP_ARTISTS':
			return {
				...state,
				userInformation: {
					...state.userInformation,
					userTopArtists: {
						...state.userInformation.userTopArtists,
						data: action.payload,
					},
				},
			};
		case 'SET_USER_TOP_ARTISTS_OFFSET':
			return {
				...state,
				userInformation: {
					...state.userInformation,
					userTopArtists: {
						...state.userInformation.userTopArtists,
						offset: action.payload,
					},
				},
			};
		case 'SET_USER_TOP_ARTISTS_TOTAL_PAGES':
			return {
				...state,
				userInformation: {
					...state.userInformation,
					userTopArtists: {
						...state.userInformation.userTopArtists,
						totalPages: action.payload,
					},
				},
			};
		case 'SET_USER_TOP_ARTISTS_ERROR':
			return {
				...state,
				userInformation: {
					...state.userInformation,
					errors: {
						...state.userInformation.errors,
						userTopArtists: action.payload,
					},
				},
			};
		case 'SET_USER_TOP_TRACKS':
			return {
				...state,
				userInformation: {
					...state.userInformation,
					userTopTracks: {
						...state.userInformation.userTopTracks,
						data: action.payload,
					},
				},
			};
		case 'SET_USER_TOP_TRACKS_OFFSET':
			return {
				...state,
				userInformation: {
					...state.userInformation,
					userTopTracks: {
						...state.userInformation.userTopTracks,
						offset: action.payload,
					},
				},
			};
		case 'SET_USER_TOP_TRACKS_TOTAL_PAGES':
			return {
				...state,
				userInformation: {
					...state.userInformation,
					userTopTracks: {
						...state.userInformation.userTopTracks,
						totalPages: action.payload,
					},
				},
			};
		case 'SET_USER_TOP_TRACKS_ERROR':
			return {
				...state,
				userInformation: {
					...state.userInformation,
					errors: {
						...state.userInformation.errors,
						userTopTracks: action.payload,
					},
				},
			};
		case 'SET_USER_FOLLOWED_ARTISTS':
			return {
				...state,
				userInformation: {
					...state.userInformation,
					userFollowedArtists: {
						...state.userInformation.userFollowedArtists,
						data: action.payload,
					},
				},
			};
		case 'SET_USER_FOLLOWED_ARTISTS_AFTER_NEXT':
			return {
				...state,
				userInformation: {
					...state.userInformation,
					userFollowedArtists: {
						...state.userInformation.userFollowedArtists,
						after: action.payload,
					},
				},
			};
		case 'SET_USER_FOLLOWED_ARTISTS_BEFORE':
			if (
				state.userInformation.userFollowedArtists.before.includes(
					action.payload
				)
			) {
				return {
					...state,
					userInformation: {
						...state.userInformation,
						userFollowedArtists: {
							...state.userInformation.userFollowedArtists,
							before: [
								...state.userInformation.userFollowedArtists
									.before,
							],
						},
					},
				};
			}
			return {
				...state,
				userInformation: {
					...state.userInformation,
					userFollowedArtists: {
						...state.userInformation.userFollowedArtists,
						before: [
							...state.userInformation.userFollowedArtists.before,
							action.payload,
						],
					},
				},
			};
		case 'SET_USER_FOLLOWED_ARTISTS_ERROR':
			return {
				...state,
				userInformation: {
					...state.userInformation,
					errors: {
						...state.userInformation.errors,
						userFollowedArtists: action.payload,
					},
				},
			};
		default:
			return state;
	}
};
