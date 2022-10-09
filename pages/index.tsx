import { useContext, useEffect, useState } from 'react';
import type { GetServerSideProps } from 'next';
import { getSession, useSession } from 'next-auth/react';

//* components
import Title from '../components/title/title';
import Layout from '../components/layout/layout';
import CardsContainer from '../components/cards-container/cards-container';

//* constants
import {
	maxTotalNumberOfResultsMainPage,
	numberOfCardsPerPageMainPage,
} from '../constants/number-of-new-album-releases';

//* context
import { SpotifyAppContext } from '../context/context';

//* hooks
import useSpotify from '../hooks/use-spotify';

//* interfaces
import { CategoryObjectModifiedInterface } from '../interfaces/category-object-modified-interface';

//* utils
import calculateNumberOfPages from '../utils/calculate-number-of-pages';

const MainPage = () => {
	const spotifyApi = useSpotify();

	const { data: session } = useSession();

	const { mainPageState, mainPageDispatch } = useContext(SpotifyAppContext);

	const [isFirstRequest, setIsFirstRequest] = useState(true);

	const getNewAlbumsReleases = async (offset: number) => {
		try {
			const response = await spotifyApi.getNewReleases({
				limit: numberOfCardsPerPageMainPage,
				offset: offset,
			});

			if (response.statusCode >= 200 && response.statusCode < 300) {
				mainPageDispatch({
					type: 'SET_NEW_ALBUMS_RELEASES_ERROR',
					payload: null,
				});

				mainPageDispatch({
					type: 'SET_NEW_ALBUMS_RELEASES',
					payload: response.body.albums.items,
				});

				if (isFirstRequest) {
					mainPageDispatch({
						type: 'SET_NEW_ALBUMS_RELEASES_TOTAL_PAGES',
						payload: calculateNumberOfPages(
							maxTotalNumberOfResultsMainPage,
							response.body.albums.total,
							numberOfCardsPerPageMainPage
						),
					});
				}
			} else {
				mainPageDispatch({
					type: 'SET_NEW_ALBUMS_RELEASES_ERROR',
					payload: `Error code ${response.statusCode}. Please try again later.`,
				});
			}
		} catch (error) {
			console.error(error);

			mainPageDispatch({
				type: 'SET_NEW_ALBUMS_RELEASES_ERROR',
				payload: `Sorry, an error occurred. Please try again later.`,
			});
		}
	};

	const getFeaturedPlaylists = async (offset: number) => {
		try {
			const response = await spotifyApi.getFeaturedPlaylists({
				limit: numberOfCardsPerPageMainPage,
				offset: offset,
			});

			if (response.statusCode >= 200 && response.statusCode < 300) {
				mainPageDispatch({
					type: 'SET_FEATURED_PLAYLISTS_ERROR',
					payload: null,
				});

				mainPageDispatch({
					type: 'SET_FEATURED_PLAYLISTS',
					payload: response.body.playlists.items,
				});

				if (isFirstRequest) {
					mainPageDispatch({
						type: 'SET_FEATURED_PLAYLISTS_TOTAL_PAGES',
						payload: calculateNumberOfPages(
							maxTotalNumberOfResultsMainPage,
							response.body.playlists.total,
							numberOfCardsPerPageMainPage
						),
					});
				}
			} else {
				mainPageDispatch({
					type: 'SET_FEATURED_PLAYLISTS_ERROR',
					payload: `Error code ${response.statusCode}. Please try again later.`,
				});
			}
		} catch (error) {
			console.error(error);
			mainPageDispatch({
				type: 'SET_FEATURED_PLAYLISTS_ERROR',
				payload: `Sorry, an error occurred. Please try again later.`,
			});
		}
	};

	const getCategories = async (offset: number) => {
		try {
			const response = await spotifyApi.getCategories({
				limit: numberOfCardsPerPageMainPage,
				offset: offset,
			});

			if (response.statusCode >= 200 && response.statusCode < 300) {
				mainPageDispatch({
					type: 'SET_CATEGORIES_ERROR',
					payload: null,
				});

				const categoriesFormatChanged: CategoryObjectModifiedInterface[] =
					response.body.categories.items.map((category) => {
						return {
							...category,
							type: 'category',
						};
					});

				mainPageDispatch({
					type: 'SET_CATEGORIES',
					payload: categoriesFormatChanged,
				});

				if (isFirstRequest) {
					mainPageDispatch({
						type: 'SET_CATEGORIES_TOTAL_PAGES',
						payload: calculateNumberOfPages(
							maxTotalNumberOfResultsMainPage,
							response.body.categories.total,
							numberOfCardsPerPageMainPage
						),
					});
				}
			} else {
				mainPageDispatch({
					type: 'SET_CATEGORIES_ERROR',
					payload: `Error code ${response.statusCode}. Please try again later.`,
				});
			}
		} catch (error) {
			console.error(error);
			mainPageDispatch({
				type: 'SET_CATEGORIES_ERROR',
				payload: `Sorry, an error occurred. Please try again later.`,
			});
		}
	};

	useEffect(() => {
		if (spotifyApi.getAccessToken() && !isFirstRequest) {
			getNewAlbumsReleases(mainPageState.newAlbumReleases.offset);
		}
	}, [mainPageState.newAlbumReleases.offset]);

	useEffect(() => {
		if (spotifyApi.getAccessToken() && !isFirstRequest) {
			getFeaturedPlaylists(mainPageState.featuredPlaylists.offset);
		}
	}, [mainPageState.featuredPlaylists.offset]);

	useEffect(() => {
		if (spotifyApi.getAccessToken() && !isFirstRequest) {
			getCategories(mainPageState.categories.offset);
		}
	}, [mainPageState.categories.offset]);

	useEffect(() => {
		if (spotifyApi.getAccessToken()) {
			getNewAlbumsReleases(0);

			getFeaturedPlaylists(0);

			getCategories(0);

			setIsFirstRequest(false);
		}
	}, [session, spotifyApi]);

	return (
		<Layout>
			<div className='bg-[#181818] p-5'>
				<Title title={`Welcome ${session?.user?.name}!`} />

				<CardsContainer
					paginationType='paginatedByOffsetInAPI'
					title='New releases'
					dataByProps={mainPageState.newAlbumReleases.data}
					id={'main'}
					pathToRedirect='album'
					totalPages={mainPageState.newAlbumReleases.totalPages}
					actionType='SET_NEW_ALBUMS_RELEASES_OFFSET'
					callback={mainPageDispatch}
					error={mainPageState.errors.newAlbumReleases}
				/>

				<CardsContainer
					paginationType='paginatedByOffsetInAPI'
					title='Featured playlists'
					dataByProps={mainPageState.featuredPlaylists.data}
					id={'main'}
					pathToRedirect={undefined}
					hasToBeRedirectToExternalUrl={true}
					totalPages={mainPageState.featuredPlaylists.totalPages}
					actionType='SET_FEATURED_PLAYLISTS_OFFSET'
					callback={mainPageDispatch}
					error={mainPageState.errors.featuredPlaylists}
				/>

				<CardsContainer
					paginationType='paginatedByOffsetInAPI'
					title='Featured playlists'
					dataByProps={mainPageState.categories.data}
					id={'main'}
					pathToRedirect={undefined}
					hasToBeRedirectToExternalUrl={true}
					totalPages={mainPageState.categories.totalPages}
					actionType='SET_CATEGORIES_OFFSET'
					callback={mainPageDispatch}
					error={mainPageState.errors.categories}
				/>
			</div>
		</Layout>
	);
};

export default MainPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
	const session = await getSession(context);

	return {
		props: { session },
	};
};
