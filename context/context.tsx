import { createContext, Dispatch, ReactNode, useReducer } from 'react';

//* action types
import { ActionType } from './action-types/action-types';

//* initial states
import {
	AlbumPageInitialState,
	AlbumPageInitialStateType,
} from './initial-states/albums-page-initial-state';
import {
	ArtistPageInitialState,
	ArtistPageInitialStateType,
} from './initial-states/artists-page-initial-state';
import {
	MainPageInitialState,
	MainPageInitialStateType,
} from './initial-states/main-page-initial-state';
import {
	TrackPageInitialState,
	TrackPageInitialStateType,
} from './initial-states/tracks-page-initial-state';
import {
	UserPageInitialState,
	UserPageInitialStateType,
} from './initial-states/user-page-initial-state';
import {
	UserLibraryPageInitialState,
	UserLibraryPageInitialStateType,
} from './initial-states/user-library-initial-state';
import {
	SearchPageInitialState,
	SearchPageInitialStateType,
} from './initial-states/search-page-initial-state';

//* reducers
import { AlbumPageReducer } from '../reducer/albums-page-reducer';
import { ArtistPageReducer } from '../reducer/artists-page-reducer';
import { MainPageReducer } from '../reducer/main-page-reducer';
import { TrackPageReducer } from '../reducer/tracks-page-reducer';
import { UserPageReducer } from '../reducer/user-page-reducer';
import { UserLibraryPageReducer } from '../reducer/user-library-reducer';
import { SearchPageReducer } from '../reducer/search-page-reducer';

export const SpotifyAppContext = createContext<{
	mainPageState: MainPageInitialStateType;
	mainPageDispatch: Dispatch<ActionType>;
	albumPageState: AlbumPageInitialStateType;
	albumPageDispatch: Dispatch<ActionType>;
	artistPageState: ArtistPageInitialStateType;
	artistPageDispatch: Dispatch<ActionType>;
	trackPageState: TrackPageInitialStateType;
	trackPageDispatch: Dispatch<ActionType>;
	userPageState: UserPageInitialStateType;
	userPageDispatch: Dispatch<ActionType>;
	userLibraryState: UserLibraryPageInitialStateType;
	userLibraryDispatch: Dispatch<ActionType>;
	searchPageState: SearchPageInitialStateType;
	searchPageDispatch: Dispatch<ActionType>;
}>({
	mainPageState: MainPageInitialState,
	mainPageDispatch: () => {},
	albumPageState: AlbumPageInitialState,
	albumPageDispatch: () => {},
	artistPageState: ArtistPageInitialState,
	artistPageDispatch: () => {},
	trackPageState: TrackPageInitialState,
	trackPageDispatch: () => {},
	userPageState: UserPageInitialState,
	userPageDispatch: () => {},
	userLibraryState: UserLibraryPageInitialState,
	userLibraryDispatch: () => {},
	searchPageState: SearchPageInitialState,
	searchPageDispatch: () => {},
});

// types
type SpotifyAppProviderPropsType = {
	children: ReactNode;
};

export const SpotifyAppProvider = ({
	children,
}: SpotifyAppProviderPropsType) => {
	// main page reducer
	const [mainPageState, mainPageDispatch] = useReducer(
		MainPageReducer,
		MainPageInitialState
	);

	// album page reducer
	const [albumPageState, albumPageDispatch] = useReducer(
		AlbumPageReducer,
		AlbumPageInitialState
	);

	// artist page reducer
	const [artistPageState, artistPageDispatch] = useReducer(
		ArtistPageReducer,
		ArtistPageInitialState
	);

	// track page reducer
	const [trackPageState, trackPageDispatch] = useReducer(
		TrackPageReducer,
		TrackPageInitialState
	);

	// user page reducer
	const [userPageState, userPageDispatch] = useReducer(
		UserPageReducer,
		UserPageInitialState
	);

	// user library page reducer
	const [userLibraryState, userLibraryDispatch] = useReducer(
		UserLibraryPageReducer,
		UserLibraryPageInitialState
	);

	// search page reducer
	const [searchPageState, searchPageDispatch] = useReducer(
		SearchPageReducer,
		SearchPageInitialState
	);

	return (
		<SpotifyAppContext.Provider
			value={{
				mainPageState,
				mainPageDispatch,
				albumPageState,
				albumPageDispatch,
				artistPageState,
				artistPageDispatch,
				trackPageState,
				trackPageDispatch,
				userPageState,
				userPageDispatch,
				userLibraryState,
				userLibraryDispatch,
				searchPageState,
				searchPageDispatch,
			}}
		>
			{children}
		</SpotifyAppContext.Provider>
	);
};
