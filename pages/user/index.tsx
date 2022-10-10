import { GetServerSideProps } from 'next';
import { getSession, useSession } from 'next-auth/react';
import { useContext, useEffect, useState } from 'react';

//* components
import CardsContainer from '../../components/cards-container/cards-container';
import DetailsHeader from '../../components/details-header/details-header';
import DetailsTracks from '../../components/details-tracks/details-tracks';
import ErrorMessage from '../../components/error-message/error-message';
import Layout from '../../components/layout/layout';

//* constants
import numberOfUserTopArtists from '../../constants/number-of-top-artists';
import numberOfTopTracks from '../../constants/number-of-top-tracks';

//* context
import { SpotifyAppContext } from '../../context/context';

//* hooks
import useSpotify from '../../hooks/use-spotify';

const UserPage = () => {
	const spotifyApi = useSpotify();

	const { data: session } = useSession();

	const { userPageState, userPageDispatch } = useContext(SpotifyAppContext);

	const [isFirstRequest, setIsFirstRequest] = useState(true);

	const getUserTopArtists = async (offset: number) => {
		try {
			const response = await spotifyApi.getMyTopArtists({
				limit: numberOfUserTopArtists,
				offset: offset,
			});

			if (response.statusCode >= 200 && response.statusCode < 300) {
				userPageDispatch({
					type: 'SET_USER_TOP_ARTISTS_ERROR',
					payload: null,
				});

				userPageDispatch({
					type: 'SET_USER_TOP_ARTISTS',
					payload: response.body.items,
				});

				userPageDispatch({
					type: 'SET_USER_TOP_ARTISTS_TOTAL_PAGES',
					payload: Math.ceil(
						response.body.total / numberOfUserTopArtists
					),
				});
			} else {
				userPageDispatch({
					type: 'SET_USER_TOP_ARTISTS_ERROR',
					payload: `Error code ${response.statusCode}. Please try again later.`,
				});
			}
		} catch (error) {
			console.error(error);

			userPageDispatch({
				type: 'SET_USER_TOP_ARTISTS_ERROR',
				payload: `Sorry, an error occurred. Please try again later.`,
			});
		}
	};

	const getUserTopTracks = async (offset: number) => {
		try {
			const response = await spotifyApi.getMyTopTracks({
				limit: numberOfTopTracks,
				offset: offset,
			});

			if (response.statusCode >= 200 && response.statusCode < 300) {
				userPageDispatch({
					type: 'SET_USER_TOP_TRACKS_ERROR',
					payload: null,
				});

				userPageDispatch({
					type: 'SET_USER_TOP_TRACKS',
					payload: response.body.items,
				});

				userPageDispatch({
					type: 'SET_USER_TOP_TRACKS_TOTAL_PAGES',
					payload: Math.ceil(response.body.total / numberOfTopTracks),
				});
			} else {
				userPageDispatch({
					type: 'SET_USER_TOP_TRACKS_ERROR',
					payload: `Error code ${response.statusCode}. Please try again later.`,
				});
			}
		} catch (error) {
			console.error(error);

			userPageDispatch({
				type: 'SET_USER_TOP_TRACKS_ERROR',
				payload: `Sorry, an error occurred. Please try again later.`,
			});
		}
	};

	const getUserFollowedArtists = async (nextPageId?: string) => {
		try {
			const response = await spotifyApi.getFollowedArtists({
				limit: numberOfTopTracks,
				after: nextPageId,
			});

			if (response.statusCode >= 200 && response.statusCode < 300) {
				userPageDispatch({
					type: 'SET_USER_FOLLOWED_ARTISTS_ERROR',
					payload: null,
				});

				userPageDispatch({
					type: 'SET_USER_FOLLOWED_ARTISTS',
					payload: response.body.artists.items,
				});

				userPageDispatch({
					type: 'SET_USER_FOLLOWED_ARTISTS_BEFORE',
					payload: response.body.artists.cursors.after,
				});
			} else {
				userPageDispatch({
					type: 'SET_USER_FOLLOWED_ARTISTS_ERROR',
					payload: `Error code ${response.statusCode}. Please try again later.`,
				});
			}
		} catch (error) {
			console.error(error);

			userPageDispatch({
				type: 'SET_USER_FOLLOWED_ARTISTS_ERROR',
				payload: `Sorry, an error occurred. Please try again later.`,
			});
		}
	};

	useEffect(() => {
		if (spotifyApi.getAccessToken() && !isFirstRequest) {
			getUserTopArtists(
				userPageState.userInformation.userTopArtists.offset
			);
		}
	}, [userPageState.userInformation.userTopArtists.offset]);

	useEffect(() => {
		if (spotifyApi.getAccessToken() && !isFirstRequest) {
			getUserTopTracks(
				userPageState.userInformation.userTopTracks.offset
			);
		}
	}, [userPageState.userInformation.userTopTracks.offset]);

	useEffect(() => {
		if (spotifyApi.getAccessToken() && !isFirstRequest) {
			getUserFollowedArtists(
				userPageState.userInformation.userFollowedArtists.after
			);
		}
	}, [userPageState.userInformation.userFollowedArtists.after]);

	useEffect(() => {
		const getUserData = async () => {
			try {
				const response = await spotifyApi.getMe();

				if (response.statusCode >= 200 && response.statusCode < 300) {
					userPageDispatch({
						type: 'SET_USER_INFORMATION_ERROR',
						payload: null,
					});

					userPageDispatch({
						type: 'SET_USER_INFORMATION',
						payload: response.body,
					});
				} else {
					userPageDispatch({
						type: 'SET_USER_INFORMATION_ERROR',
						payload: `Error code ${response.statusCode}. Please try again later.`,
					});
				}
			} catch (error) {
				console.error(error);

				userPageDispatch({
					type: 'SET_USER_INFORMATION_ERROR',
					payload: `Sorry, an error occurred. Please try again later.`,
				});
			}
		};

		if (spotifyApi.getAccessToken()) {
			getUserData();
			getUserTopArtists(0);
			getUserTopTracks(0);
			getUserFollowedArtists();
			setIsFirstRequest(false);
		}
	}, [session, spotifyApi]);

	return (
		<Layout>
			<div className='bg-[#181818] p-5'>
				<div>
					<DetailsHeader
						contentType='user'
						image={
							userPageState?.userInformation.information
								.images?.[0]?.url
								? userPageState?.userInformation.information
										.images?.[0]?.url
								: ''
						}
						title={
							userPageState.userInformation.information
								.display_name
								? userPageState.userInformation.information
										.display_name
								: userPageState.userInformation.information.id
						}
						subtitle={
							userPageState.userInformation.information.email
						}
						detail={userPageState.userInformation.information.product?.toUpperCase()}
						error={userPageState.userInformation.errors.information}
					/>

					{userPageState.userInformation.userTopTracks.data.length >
					0 ? (
						<DetailsTracks
							title='My top tracks'
							parentComponent='album'
							tracks={
								userPageState.userInformation.userTopTracks.data
							}
							id={userPageState.userInformation.information.id}
							actionType='SET_USER_TOP_TRACKS_OFFSET'
							tracksPerPage={numberOfTopTracks}
							totalPages={
								userPageState.userInformation.userTopTracks
									.totalPages
							}
							hasToBePaginated={true}
							callback={userPageDispatch}
							error={
								userPageState.userInformation.errors
									.userTopTracks
							}
						/>
					) : (
						<div className='my-14'>
							<ErrorMessage error='No top tracks found.' />
						</div>
					)}

					{userPageState.userInformation.userTopArtists.data.length >
					0 ? (
						<CardsContainer
							paginationType='paginatedByOffsetInAPI'
							title='My top artists'
							dataByProps={
								userPageState.userInformation.userTopArtists
									.data
							}
							id={userPageState.userInformation.information.id}
							cardsFormat='circle'
							pathToRedirect='artist'
							totalPages={
								userPageState.userInformation.userTopArtists
									.totalPages
							}
							actionType='SET_USER_TOP_ARTISTS_OFFSET'
							callback={userPageDispatch}
							error={
								userPageState.userInformation.errors
									.userTopArtists
							}
						/>
					) : (
						<div className='my-14'>
							<ErrorMessage error='No top artists found.' />
						</div>
					)}

					{userPageState.userInformation.userFollowedArtists.data
						.length > 0 ? (
						<CardsContainer
							paginationType='paginatedByAfterInAPI'
							afterParameter={
								userPageState.userInformation
									.userFollowedArtists.before
							}
							title='My followed artists'
							dataByProps={
								userPageState.userInformation
									.userFollowedArtists.data
							}
							id={userPageState.userInformation.information.id}
							cardsFormat='circle'
							pathToRedirect='artist'
							actionType='SET_USER_FOLLOWED_ARTISTS_AFTER_NEXT'
							callback={userPageDispatch}
							error={
								userPageState.userInformation.errors
									.userFollowedArtists
							}
						/>
					) : (
						<div className='my-14'>
							<ErrorMessage error='You do not follow any artist.' />
						</div>
					)}
				</div>
			</div>
		</Layout>
	);
};

export default UserPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
	const session = await getSession(context);

	return {
		props: { session },
	};
};
