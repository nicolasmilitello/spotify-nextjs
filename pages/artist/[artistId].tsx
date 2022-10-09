import { useContext, useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { getSession, useSession } from 'next-auth/react';

//* components
import Layout from '../../components/layout/layout';
import DetailsHeader from '../../components/details-header/details-header';
import DetailsTracks from '../../components/details-tracks/details-tracks';
import MostRecentSingle from '../../components/most-recent-single/most-recent-single';
import CardsContainer from '../../components/cards-container/cards-container';

//* constans
import { market } from '../../constants/market';
import numberOfAlbumCards from '../../constants/number-of-album-cards';
import numberOfRelatedArtistCards from '../../constants/number-of-related-artist-cards';

//* context
import { SpotifyAppContext } from '../../context/context';

//* hooks
import useSpotify from '../../hooks/use-spotify';

// types
type ArtistPagePropsType = {
	artist: string;
};

const ArtistPage = ({ artist }: ArtistPagePropsType) => {
	const spotifyApi = useSpotify();

	const { data: session } = useSession();

	const { artistPageState, artistPageDispatch } =
		useContext(SpotifyAppContext);

	useEffect(() => {
		const getArtistData = async () => {
			try {
				const response = await spotifyApi.getArtist(artist);
				if (response.statusCode >= 200 && response.statusCode < 300) {
					artistPageDispatch({
						type: 'SET_SINGLE_ARTIST_INFORMATION_ERROR',
						payload: null,
					});

					artistPageDispatch({
						type: 'SET_SINGLE_ARTIST_INFORMATION',
						payload: response.body,
					});
				} else {
					artistPageDispatch({
						type: 'SET_SINGLE_ARTIST_INFORMATION_ERROR',
						payload: `Error code ${response.statusCode}. Please try again later.`,
					});
				}
			} catch (error) {
				console.error(error);

				artistPageDispatch({
					type: 'SET_SINGLE_ARTIST_INFORMATION_ERROR',
					payload: `Sorry, an error occurred. Please try again later.`,
				});
			}
		};

		const getArtistTopTracks = async () => {
			try {
				const response = await spotifyApi.getArtistTopTracks(
					artist,
					market
				);

				if (response.statusCode >= 200 && response.statusCode < 300) {
					artistPageDispatch({
						type: 'SET_SINGLE_ARTIST_TOP_TRACKS_ERROR',
						payload: null,
					});

					artistPageDispatch({
						type: 'SET_SINGLE_ARTIST_TOP_TRACKS',
						payload: response.body.tracks,
					});
				} else {
					artistPageDispatch({
						type: 'SET_SINGLE_ARTIST_TOP_TRACKS_ERROR',
						payload: `Error code ${response.statusCode}. Please try again later.`,
					});
				}
			} catch (error) {
				console.error(error);

				artistPageDispatch({
					type: 'SET_SINGLE_ARTIST_TOP_TRACKS_ERROR',
					payload: `Sorry, an error occurred. Please try again later.`,
				});
			}
		};

		const getArtistLastSingle = async () => {
			try {
				const response = await spotifyApi.getArtistAlbums(artist, {
					limit: 1,
				});

				if (response.statusCode >= 200 && response.statusCode < 300) {
					artistPageDispatch({
						type: 'SET_ARTIST_LAST_SINGLE_ERROR',
						payload: null,
					});

					artistPageDispatch({
						type: 'SET_ARTIST_LAST_SINGLE',
						payload: response.body.items,
					});
				} else {
					artistPageDispatch({
						type: 'SET_ARTIST_LAST_SINGLE_ERROR',
						payload: `Error code ${response.statusCode}. Please try again later.`,
					});
				}
			} catch (error) {
				console.error(error);

				artistPageDispatch({
					type: 'SET_ARTIST_LAST_SINGLE_ERROR',
					payload: `Sorry, an error occurred. Please try again later.`,
				});
			}
		};

		const getArtistRelatedArtists = async () => {
			try {
				const response = await spotifyApi.getArtistRelatedArtists(
					artist
				);

				if (response.statusCode >= 200 && response.statusCode < 300) {
					artistPageDispatch({
						type: 'SET_SINGLE_ARTIST_RELATED_ARTISTS_ERROR',
						payload: null,
					});

					artistPageDispatch({
						type: 'SET_SINGLE_ARTIST_RELATED_ARTISTS',
						payload: response.body.artists,
					});

					artistPageDispatch({
						type: 'SET_SINGLE_ARTIST_RELATED_ARTISTS_TOTAL_PAGES',
						payload: Math.ceil(
							response.body.artists.length /
								numberOfRelatedArtistCards
						),
					});
				} else {
					artistPageDispatch({
						type: 'SET_SINGLE_ARTIST_RELATED_ARTISTS_ERROR',
						payload: `Error code ${response.statusCode}. Please try again later.`,
					});
				}
			} catch (error) {
				console.error(error);

				artistPageDispatch({
					type: 'SET_SINGLE_ARTIST_RELATED_ARTISTS_ERROR',
					payload: `Sorry, an error occurred. Please try again later.`,
				});
			}
		};

		if (spotifyApi.getAccessToken() && typeof artist === 'string') {
			getArtistData();

			getArtistTopTracks();

			getArtistLastSingle();

			getArtistRelatedArtists();
		}
	}, [session, spotifyApi, artist]);

	useEffect(() => {
		artistPageDispatch({
			type: 'SET_SINGLE_ARTIST_ALBUMS_OFFSET',
			payload: 0,
		});
	}, [artist]);

	useEffect(() => {
		const getArtistAlbums = async () => {
			try {
				const response = await spotifyApi.getArtistAlbums(artist, {
					limit: numberOfAlbumCards,
					offset: artistPageState.singleArtist.albums.offset,
				});

				if (response.statusCode >= 200 && response.statusCode < 300) {
					artistPageDispatch({
						type: 'SET_SINGLE_ARTIST_ALBUMS_ERROR',
						payload: null,
					});

					artistPageDispatch({
						type: 'SET_SINGLE_ARTIST_ALBUMS',
						payload: response.body.items,
					});

					artistPageDispatch({
						type: 'SET_SINGLE_ARTIST_ALBUMS_TOTAL_PAGES',
						payload: Math.ceil(
							response.body.total / numberOfAlbumCards
						),
					});
				} else {
					artistPageDispatch({
						type: 'SET_SINGLE_ARTIST_ALBUMS_ERROR',
						payload: `Error code ${response.statusCode}. Please try again later.`,
					});
				}
			} catch (error) {
				console.error(error);

				artistPageDispatch({
					type: 'SET_SINGLE_ARTIST_ALBUMS_ERROR',
					payload: `Sorry, an error occurred. Please try again later.`,
				});
			}
		};
		if (spotifyApi.getAccessToken() && typeof artist === 'string') {
			getArtistAlbums();
		}
	}, [session, spotifyApi, artistPageState.singleArtist.albums.offset]);

	return (
		<div>
			<Layout>
				<div className='bg-[#181818] p-5'>
					<div>
						<DetailsHeader
							contentType='artist'
							image={
								artistPageState.singleArtist.information
									.images?.[0]?.url
							}
							title={
								artistPageState.singleArtist.information?.name
							}
							error={
								artistPageState.singleArtist.error.information
							}
						/>

						<div className='grid grid-cols-1 md:grid-cols-2'>
							<MostRecentSingle
								image={
									artistPageState.singleArtist.information
										.images?.[0]?.url
								}
								lastAlbum={{
									image: artistPageState.singleArtist
										.lastSingle?.[0]?.images[0].url,
									name: artistPageState.singleArtist
										.lastSingle?.[0]?.name,
									id: artistPageState.singleArtist
										.lastSingle?.[0]?.id,
									artistName:
										artistPageState.singleArtist.information
											.name,
								}}
								error={
									artistPageState.singleArtist.error
										.lastSingle
								}
							/>

							<DetailsTracks
								title='Top tracks'
								parentComponent='artist'
								tracks={artistPageState.singleArtist.topTracks}
								hasToBePaginated={false}
								tracksPerPage={10}
								callback={artistPageDispatch}
								error={
									artistPageState.singleArtist.error.topTracks
								}
							/>
						</div>

						<CardsContainer
							paginationType='paginatedByOffsetInAPI'
							pathToRedirect='album'
							dataByProps={
								artistPageState.singleArtist.albums.data
							}
							totalPages={
								artistPageState.singleArtist.albums.totalPages
							}
							title='Albums'
							id={artist}
							actionType='SET_SINGLE_ARTIST_ALBUMS_OFFSET'
							callback={artistPageDispatch}
							error={artistPageState.singleArtist.error.albums}
						/>

						<CardsContainer
							paginationType='paginatedInFrontend'
							cardsPerPage={numberOfRelatedArtistCards}
							pathToRedirect='artist'
							dataByProps={
								artistPageState.singleArtist.relatedArtists.data
							}
							totalPages={
								artistPageState.singleArtist.relatedArtists
									.totalPages
							}
							id={artist}
							title='Related Artists'
							cardsFormat='circle'
							callback={artistPageDispatch}
							error={
								artistPageState.singleArtist.error
									.relatedArtists
							}
						/>
					</div>
				</div>
			</Layout>
		</div>
	);
};

export default ArtistPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
	const session = await getSession(context);

	const artist = context.params?.artistId as string;

	return {
		props: { artist, session },
	};
};
