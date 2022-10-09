import { useSession } from 'next-auth/react';
import { useContext, useEffect, useState } from 'react';

//* components
import CardsContainer from '../../components/cards-container/cards-container';
import DetailsTracks from '../../components/details-tracks/details-tracks';
import Layout from '../../components/layout/layout';
import Title from '../../components/title/title';

//* constants
import {
	maxTotalNumberOfResultsYourLibraryPage,
	numberOfCardsPerPageYourLibraryPage,
} from '../../constants/number-of-cards-your-library-page';

//* context
import { SpotifyAppContext } from '../../context/context';

//* hooks
import useSpotify from '../../hooks/use-spotify';

const YourLibraryPage = () => {
	const spotifyApi = useSpotify();

	const { data: session } = useSession();

	const { userLibraryState, userLibraryDispatch } =
		useContext(SpotifyAppContext);

	const [isFirstRequest, setIsFirstRequest] = useState(true);

	const getUserSavedAlbums = async (offset: number) => {
		try {
			const response = await spotifyApi.getMySavedAlbums({
				limit: numberOfCardsPerPageYourLibraryPage,
				offset: offset,
			});

			if (response.statusCode >= 200 && response.statusCode < 300) {
				userLibraryDispatch({
					type: 'SET_USER_LIBRARY_ALBUMS_ERROR',
					payload: null,
				});

				const savedAlbumsFormatChanged = response.body.items.map(
					(album) => {
						return album.album;
					}
				);

				userLibraryDispatch({
					type: 'SET_USER_LIBRARY_ALBUMS',
					payload: savedAlbumsFormatChanged,
				});

				userLibraryDispatch({
					type: 'SET_USER_LIBRARY_ALBUMS_TOTAL_PAGES',
					payload: Math.ceil(
						(response.body.total >
						maxTotalNumberOfResultsYourLibraryPage
							? maxTotalNumberOfResultsYourLibraryPage
							: response.body.total) /
							numberOfCardsPerPageYourLibraryPage
					),
				});
			} else {
				userLibraryDispatch({
					type: 'SET_USER_LIBRARY_ALBUMS_ERROR',
					payload: `Error code ${response.statusCode}. Please try again later.`,
				});
			}
		} catch (error) {
			console.error(error);

			userLibraryDispatch({
				type: 'SET_USER_LIBRARY_ALBUMS_ERROR',
				payload: `Sorry, an error occurred. Please try again later.`,
			});
		}
	};

	const getUserSavedTracks = async (offset: number) => {
		try {
			const response = await spotifyApi.getMySavedTracks({
				limit: numberOfCardsPerPageYourLibraryPage,
				offset: offset,
			});

			if (response.statusCode >= 200 && response.statusCode < 300) {
				userLibraryDispatch({
					type: 'SET_USER_LIBRARY_TRACKS_ERROR',
					payload: null,
				});

				const savedTracksFormatChanged = response.body.items.map(
					(track) => {
						return track.track;
					}
				);

				userLibraryDispatch({
					type: 'SET_USER_LIBRARY_TRACKS',
					payload: savedTracksFormatChanged,
				});

				userLibraryDispatch({
					type: 'SET_USER_LIBRARY_TRACKS_TOTAL_PAGES',
					payload: Math.ceil(
						(response.body.total >
						maxTotalNumberOfResultsYourLibraryPage
							? maxTotalNumberOfResultsYourLibraryPage
							: response.body.total) /
							numberOfCardsPerPageYourLibraryPage
					),
				});
			} else {
				userLibraryDispatch({
					type: 'SET_USER_LIBRARY_TRACKS_ERROR',
					payload: `Error code ${response.statusCode}. Please try again later.`,
				});
			}
		} catch (error) {
			console.error(error);

			userLibraryDispatch({
				type: 'SET_USER_LIBRARY_TRACKS_ERROR',
				payload: `Sorry, an error occurred. Please try again later.`,
			});
		}
	};

	useEffect(() => {
		if (spotifyApi.getAccessToken() && !isFirstRequest) {
			getUserSavedAlbums(userLibraryState.userLibrary.albums.offset);
		}
	}, [userLibraryState.userLibrary.albums.offset]);

	useEffect(() => {
		if (spotifyApi.getAccessToken() && !isFirstRequest) {
			getUserSavedTracks(userLibraryState.userLibrary.tracks.offset);
		}
	}, [userLibraryState.userLibrary.tracks.offset]);

	useEffect(() => {
		if (spotifyApi.getAccessToken()) {
			getUserSavedAlbums(0);
			getUserSavedTracks(0);
			setIsFirstRequest(false);
		}
	}, [spotifyApi, session]);

	return (
		<Layout>
			<div className='bg-[#181818] p-5 font-montserrat'>
				<Title title='Your library' />

				<DetailsTracks
					title='Saved tracks'
					parentComponent='album'
					tracks={userLibraryState.userLibrary.tracks.data}
					id={'yourlibrary'}
					actionType='SET_USER_LIBRARY_TRACKS_OFFSET'
					tracksPerPage={numberOfCardsPerPageYourLibraryPage}
					totalPages={userLibraryState.userLibrary.tracks.totalPages}
					hasToBePaginated={true}
					callback={userLibraryDispatch}
					error={userLibraryState.userLibrary.errors.tracks}
				/>

				<CardsContainer
					paginationType='paginatedByOffsetInAPI'
					title='Saved albums'
					dataByProps={userLibraryState.userLibrary.albums.data}
					id={'yourlibrary'}
					pathToRedirect='album'
					totalPages={userLibraryState.userLibrary.albums.totalPages}
					actionType='SET_USER_LIBRARY_ALBUMS_OFFSET'
					callback={userLibraryDispatch}
					error={userLibraryState.userLibrary.errors.albums}
				/>
			</div>
		</Layout>
	);
};

export default YourLibraryPage;
