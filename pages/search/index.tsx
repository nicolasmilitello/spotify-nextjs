import { GetServerSideProps } from 'next';
import { getSession, useSession } from 'next-auth/react';
import { useContext, useEffect, useState } from 'react';

//* components
import CardsContainer from '../../components/cards-container/cards-container';
import DetailsTracks from '../../components/details-tracks/details-tracks';
import ErrorMessage from '../../components/error-message/error-message';
import Layout from '../../components/layout/layout';
import Loading from '../../components/loading/loading';

//* constants
import {
	maxTotalNumberOfResults,
	numberOfResultsPerPage,
} from '../../constants/number-of-results';

//* context
import { SpotifyAppContext } from '../../context/context';

//* helpers
import checkExistance from './helpers/check-existance';

//* hooks
import useDebounce from '../../hooks/use-debounce';
import useSpotify from '../../hooks/use-spotify';

const SearchPage = () => {
	const spotifyApi = useSpotify();

	const { data: session } = useSession();

	const { searchPageState, searchPageDispatch } =
		useContext(SpotifyAppContext);

	const [loading, setLoading] = useState(false);

	const [value, setValue] = useState('');

	const searchValue = useDebounce(value, 1000);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
		setLoading(true);
	};

	const saveTrackResultsInState = (
		items: SpotifyApi.TrackObjectFull[],
		isFirstRequest: boolean,
		totalFoundResources?: number,
		resultsPerPage?: number,
		maxNumberOfResultsAllowed?: number
	) => {
		searchPageDispatch({
			type: 'SET_SEARCH_TRACK_RESULTS',
			payload: items,
		});

		if (
			isFirstRequest &&
			totalFoundResources &&
			resultsPerPage &&
			maxNumberOfResultsAllowed
		) {
			searchPageDispatch({
				type: 'SET_SEARCH_TRACK_RESULTS_TOTAL_PAGES',
				payload: Math.ceil(
					(totalFoundResources >= maxNumberOfResultsAllowed
						? maxNumberOfResultsAllowed
						: totalFoundResources) / resultsPerPage
				),
			});
		}
	};

	const saveArtistResultsInState = (
		items: SpotifyApi.ArtistObjectFull[],
		isFirstRequest: boolean,
		totalFoundResources?: number,
		resultsPerPage?: number,
		maxNumberOfResultsAllowed?: number
	) => {
		searchPageDispatch({
			type: 'SET_SEARCH_ARTIST_RESULTS',
			payload: items,
		});

		if (
			isFirstRequest &&
			totalFoundResources &&
			resultsPerPage &&
			maxNumberOfResultsAllowed
		) {
			searchPageDispatch({
				type: 'SET_SEARCH_ARTIST_RESULTS_TOTAL_PAGES',
				payload: Math.ceil(
					(totalFoundResources >= maxNumberOfResultsAllowed
						? maxNumberOfResultsAllowed
						: totalFoundResources) / resultsPerPage
				),
			});
		}
	};

	const saveAlbumResultsInState = (
		items: SpotifyApi.AlbumObjectSimplified[],
		isFirstRequest: boolean,
		totalFoundResources?: number,
		resultsPerPage?: number,
		maxNumberOfResultsAllowed?: number
	) => {
		searchPageDispatch({
			type: 'SET_SEARCH_ALBUM_RESULTS',
			payload: items,
		});

		if (
			isFirstRequest &&
			totalFoundResources &&
			resultsPerPage &&
			maxNumberOfResultsAllowed
		) {
			searchPageDispatch({
				type: 'SET_SEARCH_ALBUM_RESULTS_TOTAL_PAGES',
				payload: Math.ceil(
					(totalFoundResources >= maxNumberOfResultsAllowed
						? maxNumberOfResultsAllowed
						: totalFoundResources) / resultsPerPage
				),
			});
		}
	};

	const getAllResources = async () => {
		try {
			const response = await spotifyApi.search(
				searchValue,
				['album', 'artist', 'track'],
				{
					limit: numberOfResultsPerPage,
				}
			);

			if (response.statusCode >= 200 && response.statusCode < 300) {
				searchPageDispatch({
					type: 'SET_SEARCH_ARTIST_RESULTS_ERROR',
					payload: null,
				});

				searchPageDispatch({
					type: 'SET_SEARCH_ALBUM_RESULTS_ERROR',
					payload: null,
				});

				searchPageDispatch({
					type: 'SET_SEARCH_TRACK_RESULTS_ERROR',
					payload: null,
				});

				if (response.body.artists) {
					saveArtistResultsInState(
						response.body.artists.items,
						true,
						response.body.artists.total,
						numberOfResultsPerPage,
						maxTotalNumberOfResults
					);
				}

				if (response.body.albums) {
					saveAlbumResultsInState(
						response.body.albums.items,
						true,
						response.body.albums.total,
						numberOfResultsPerPage,
						maxTotalNumberOfResults
					);
				}

				if (response.body.tracks) {
					saveTrackResultsInState(
						response.body.tracks.items,
						true,
						response.body.tracks.total,
						numberOfResultsPerPage,
						maxTotalNumberOfResults
					);
				}
			} else {
				searchPageDispatch({
					type: 'SET_SEARCH_ARTIST_RESULTS_ERROR',
					payload: `Error code ${response.statusCode}. Please try again later.`,
				});

				searchPageDispatch({
					type: 'SET_SEARCH_ALBUM_RESULTS_ERROR',
					payload: `Error code ${response.statusCode}. Please try again later.`,
				});

				searchPageDispatch({
					type: 'SET_SEARCH_TRACK_RESULTS_ERROR',
					payload: `Error code ${response.statusCode}. Please try again later.`,
				});
			}
		} catch (error) {
			console.error(error);

			searchPageDispatch({
				type: 'SET_SEARCH_ARTIST_RESULTS_ERROR',
				payload: `Sorry, an error occurred. Please try again later.`,
			});

			searchPageDispatch({
				type: 'SET_SEARCH_ALBUM_RESULTS_ERROR',
				payload: `Sorry, an error occurred. Please try again later.`,
			});

			searchPageDispatch({
				type: 'SET_SEARCH_TRACK_RESULTS_ERROR',
				payload: `Sorry, an error occurred. Please try again later.`,
			});
		}
	};

	const getArtistResultsByPage = async (offset: number) => {
		try {
			const response = await spotifyApi.searchArtists(searchValue, {
				limit: numberOfResultsPerPage,
				offset: offset,
			});

			if (response.statusCode >= 200 && response.statusCode < 300) {
				searchPageDispatch({
					type: 'SET_SEARCH_ARTIST_RESULTS_ERROR',
					payload: null,
				});

				if (response.body.artists) {
					saveArtistResultsInState(
						response.body.artists.items,
						false
					);
				}
			} else {
				searchPageDispatch({
					type: 'SET_SEARCH_ARTIST_RESULTS_ERROR',
					payload: `Error code ${response.statusCode}. Please try again later.`,
				});
			}
		} catch (error) {
			console.error(error);

			searchPageDispatch({
				type: 'SET_SEARCH_ARTIST_RESULTS_ERROR',
				payload: `Sorry, an error occurred. Please try again later.`,
			});
		}
	};

	const getAlbumResultsByPage = async (offset: number) => {
		try {
			const response = await spotifyApi.searchAlbums(searchValue, {
				limit: numberOfResultsPerPage,
				offset: offset,
			});

			if (response.statusCode >= 200 && response.statusCode < 300) {
				searchPageDispatch({
					type: 'SET_SEARCH_ALBUM_RESULTS_ERROR',
					payload: null,
				});

				if (response.body.albums) {
					saveAlbumResultsInState(response.body.albums.items, false);
				}
			} else {
				searchPageDispatch({
					type: 'SET_SEARCH_ALBUM_RESULTS_ERROR',
					payload: `Error code ${response.statusCode}. Please try again later.`,
				});
			}
		} catch (error) {
			console.error(error);

			searchPageDispatch({
				type: 'SET_SEARCH_ALBUM_RESULTS_ERROR',
				payload: `Sorry, an error occurred. Please try again later.`,
			});
		}
	};

	const getTrackResultsByPage = async (offset: number) => {
		try {
			const response = await spotifyApi.searchTracks(searchValue, {
				limit: numberOfResultsPerPage,
				offset: offset,
			});

			if (response.statusCode >= 200 && response.statusCode < 300) {
				searchPageDispatch({
					type: 'SET_SEARCH_TRACK_RESULTS_ERROR',
					payload: null,
				});

				if (response.body.tracks) {
					saveTrackResultsInState(response.body.tracks.items, false);
				}
			} else {
				searchPageDispatch({
					type: 'SET_SEARCH_TRACK_RESULTS_ERROR',
					payload: `Error code ${response.statusCode}. Please try again later.`,
				});
			}
		} catch (error) {
			console.error(error);

			searchPageDispatch({
				type: 'SET_SEARCH_TRACK_RESULTS_ERROR',
				payload: `Sorry, an error occurred. Please try again later.`,
			});
		}
	};

	useEffect(() => {
		if (spotifyApi.getAccessToken() && searchValue) {
			getAllResources();
			setLoading(false);
		}

		if (!searchValue) {
			searchPageDispatch({
				type: 'CLEAR_SEARCH_RESULTS',
			});
			setLoading(false);
		}
	}, [spotifyApi, session, searchValue]);

	useEffect(() => {
		if (
			spotifyApi.getAccessToken() &&
			searchValue &&
			searchPageState.search.artists.offset !== undefined
		) {
			getArtistResultsByPage(searchPageState.search.artists.offset);
		}
	}, [searchPageState.search.artists.offset]);

	useEffect(() => {
		if (
			spotifyApi.getAccessToken() &&
			searchValue &&
			searchPageState.search.albums.offset !== undefined
		) {
			getAlbumResultsByPage(searchPageState.search.albums.offset);
		}
	}, [searchPageState.search.albums.offset]);

	useEffect(() => {
		if (
			spotifyApi.getAccessToken() &&
			searchValue &&
			searchPageState.search.tracks.offset !== undefined
		) {
			getTrackResultsByPage(searchPageState.search.tracks.offset);
		}
	}, [searchPageState.search.tracks.offset]);

	return (
		<Layout>
			<div className='bg-[#181818] p-5 font-montserrat'>
				<div className='bg-black p-5 text-center w-full'>
					<input
						className='placeholder:font-montserrat text-xs p-2 w-full sm:w-2/4'
						type='text'
						placeholder='What do you want to listen?'
						value={value}
						onChange={handleChange}
					/>
				</div>

				{loading && <Loading />}

				{!searchValue && !loading && (
					<div className='flex flex-col items-center justify-center h-fit'>
						<p className='text-white p-5 text-center border border-spacing-6 my-10 font-extrabold text-2xl'>
							What do you want to listen?
							<span className='text-xs block mt-2 font-normal'>
								Try looking for artists, tracks or albums.
							</span>
						</p>
					</div>
				)}

				{searchValue &&
					!loading &&
					!checkExistance(searchPageState.search.artists.data) &&
					!checkExistance(searchPageState.search.albums.data) &&
					!checkExistance(searchPageState.search.tracks.data) && (
						<div className='my-10'>
							<ErrorMessage error='No results were found... Try with another word.' />
						</div>
					)}

				<div>
					{searchValue ? (
						searchPageState.search.artists.data?.length ? (
							<CardsContainer
								paginationType='paginatedByOffsetInAPI'
								pathToRedirect='artist'
								dataByProps={
									searchPageState.search.artists.data
								}
								totalPages={
									searchPageState.search.artists.totalPages
								}
								title='Artist results'
								cardsFormat='circle'
								id={'search'}
								actionType='SET_SEARCH_ARTIST_RESULTS_OFFSET'
								callback={searchPageDispatch}
								error={searchPageState.search.errors.artists}
							/>
						) : checkExistance(
								searchPageState.search.albums.data
						  ) ||
						  checkExistance(searchPageState.search.tracks.data) ? (
							<ErrorMessage error='No results were found for artists' />
						) : null
					) : null}

					{searchValue ? (
						searchPageState.search.albums.data?.length ? (
							<CardsContainer
								paginationType='paginatedByOffsetInAPI'
								pathToRedirect='album'
								dataByProps={searchPageState.search.albums.data}
								totalPages={
									searchPageState.search.albums.totalPages
								}
								title='Album results'
								id={'search'}
								actionType='SET_SEARCH_ALBUM_RESULTS_OFFSET'
								callback={searchPageDispatch}
								error={searchPageState.search.errors.albums}
							/>
						) : checkExistance(
								searchPageState.search.artists.data
						  ) ||
						  checkExistance(searchPageState.search.tracks.data) ? (
							<ErrorMessage error='No results were found for albums.' />
						) : null
					) : null}

					{searchValue ? (
						searchPageState.search.tracks.data?.length ? (
							<DetailsTracks
								title='Track results'
								parentComponent='album'
								tracks={searchPageState.search.tracks.data}
								id={'search'}
								actionType='SET_SEARCH_TRACK_RESULTS_OFFSET'
								tracksPerPage={numberOfResultsPerPage}
								totalPages={
									searchPageState.search.tracks.totalPages
								}
								hasToBePaginated={true}
								callback={searchPageDispatch}
								error={searchPageState.search.errors.tracks}
							/>
						) : checkExistance(
								searchPageState.search.albums.data
						  ) ||
						  checkExistance(
								searchPageState.search.artists.data
						  ) ? (
							<ErrorMessage error='No results were found for tracks.' />
						) : null
					) : null}
				</div>
			</div>
		</Layout>
	);
};

export default SearchPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
	const session = await getSession(context);

	return {
		props: { session },
	};
};
