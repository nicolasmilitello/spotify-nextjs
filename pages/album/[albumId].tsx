import { GetServerSideProps } from 'next';
import { getSession, useSession } from 'next-auth/react';
import { useContext, useEffect } from 'react';

//* components
import DetailsHeader from '../../components/details-header/details-header';
import DetailsTracks from '../../components/details-tracks/details-tracks';
import Layout from '../../components/layout/layout';

//* constants
import numberOfTracks from '../../constants/number-of-tracks';

//* context
import { SpotifyAppContext } from '../../context/context';

//* hooks
import useSpotify from '../../hooks/use-spotify';

// types
type AlbumPagePropsType = {
	album: string;
};

const AlbumPage = ({ album }: AlbumPagePropsType) => {
	const spotifyApi = useSpotify();

	const { data: session } = useSession();

	const { albumPageState, albumPageDispatch } = useContext(SpotifyAppContext);

	useEffect(() => {
		const getAlbumData = async () => {
			try {
				const response = await spotifyApi.getAlbum(album);
				if (response.statusCode >= 200 && response.statusCode < 300) {
					albumPageDispatch({
						type: 'SET_SINGLE_ALBUM_INFORMATION_ERROR',
						payload: null,
					});

					albumPageDispatch({
						type: 'SET_SINGLE_ALBUM_INFORMATION',
						payload: response.body,
					});
				} else {
					albumPageDispatch({
						type: 'SET_SINGLE_ALBUM_INFORMATION_ERROR',
						payload: `Error code ${response.statusCode}. Please try again later.`,
					});
				}
			} catch (error) {
				console.error(error);

				albumPageDispatch({
					type: 'SET_SINGLE_ALBUM_INFORMATION_ERROR',
					payload: `Sorry, an error occurred. Please try again later.`,
				});
			}
		};

		if (spotifyApi.getAccessToken()) {
			getAlbumData();
		}
	}, [session, spotifyApi, album]);

	useEffect(() => {
		const getAlbumTracklist = async () => {
			try {
				const response = await spotifyApi.getAlbumTracks(album, {
					limit: numberOfTracks,
					offset: albumPageState.singleAlbum.tracks.offset,
				});
				if (response.statusCode >= 200 && response.statusCode < 300) {
					albumPageDispatch({
						type: 'SET_SINGLE_ALBUM_TRACKS_ERROR',
						payload: null,
					});

					albumPageDispatch({
						type: 'SET_SINGLE_ALBUM_TRACKS',
						payload: response.body.items,
					});

					albumPageDispatch({
						type: 'SET_SINGLE_ALBUM_TRACKS_TOTAL_PAGES',
						payload: Math.ceil(
							response.body.total / numberOfTracks
						),
					});
				} else {
					albumPageDispatch({
						type: 'SET_SINGLE_ALBUM_TRACKS_ERROR',
						payload: `Error code ${response.statusCode}. Please try again later.`,
					});
				}
			} catch (error) {
				console.error(error);

				albumPageDispatch({
					type: 'SET_SINGLE_ALBUM_TRACKS_ERROR',
					payload: `Sorry, an error occurred. Please try again later.`,
				});
			}
		};

		if (spotifyApi.getAccessToken()) {
			getAlbumTracklist();
		}
	}, [session, spotifyApi, album, albumPageState.singleAlbum.tracks.offset]);

	return (
		<Layout>
			<div className='bg-[#181818] p-5'>
				<div>
					<DetailsHeader
						contentType='album'
						image={
							albumPageState?.singleAlbum.information.images?.[0]
								.url
						}
						title={albumPageState?.singleAlbum.information.name}
						subtitle={
							albumPageState?.singleAlbum.information.artists
						}
						detail={albumPageState.singleAlbum.information.release_date?.slice(
							0,
							4
						)}
						error={albumPageState.singleAlbum.errors.information}
					/>

					<div className='grid grid-cols-1'>
						<DetailsTracks
							title='Tracklist'
							parentComponent='album'
							tracks={albumPageState?.singleAlbum.tracks.data}
							image={
								albumPageState.singleAlbum.information
									.images?.[0].url
							}
							id={albumPageState.singleAlbum.information.id}
							actionType='SET_SINGLE_ALBUM_TRACKS_OFFSET'
							tracksPerPage={numberOfTracks}
							totalPages={
								albumPageState.singleAlbum.tracks.totalPages
							}
							hasToBePaginated={true}
							callback={albumPageDispatch}
							error={albumPageState.singleAlbum.errors.tracks}
						/>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default AlbumPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
	const session = await getSession(context);

	const album = context.params?.albumId as string;

	return {
		props: { album, session },
	};
};
