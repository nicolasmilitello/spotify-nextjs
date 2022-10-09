import { GetServerSideProps } from 'next';
import { getSession, useSession } from 'next-auth/react';
import { useContext, useEffect, useState } from 'react';

//* components
import DetailsHeader from '../../components/details-header/details-header';
import Layout from '../../components/layout/layout';
import MusicPlayer from '../../components/music-player/music-player';

//* context
import { SpotifyAppContext } from '../../context/context';

//* hooks
import useSpotify from '../../hooks/use-spotify';

// types
type TrackPagePropsType = {
	track: string;
};

const TrackPage = ({ track }: TrackPagePropsType) => {
	const spotifyApi = useSpotify();

	const { data: session } = useSession();

	const { trackPageState, trackPageDispatch } = useContext(SpotifyAppContext);

	const [token, setToken] = useState<string>();

	const [isPremiumUser, setIsPremiumUser] = useState<boolean>(false);

	useEffect(() => {
		const getTrackData = async () => {
			try {
				setToken(spotifyApi.getAccessToken());

				const user = await spotifyApi.getMe();

				if (user.body.product === 'premium') {
					setIsPremiumUser(true);
				}

				const response = await spotifyApi.getTrack(track);

				if (response.statusCode >= 200 && response.statusCode < 300) {
					trackPageDispatch({
						type: 'SET_SINGLE_TRACK_INFORMATION_ERROR',
						payload: null,
					});

					trackPageDispatch({
						type: 'SET_SINGLE_TRACK_INFORMATION',
						payload: response.body,
					});
				} else {
					trackPageDispatch({
						type: 'SET_SINGLE_TRACK_INFORMATION_ERROR',
						payload: `Error code ${response.statusCode}. Please try again later.`,
					});
				}
			} catch (error) {
				console.error(error);

				trackPageDispatch({
					type: 'SET_SINGLE_TRACK_INFORMATION_ERROR',
					payload: `Sorry, an error occurred. Please try again later.`,
				});
			}
		};

		if (spotifyApi.getAccessToken()) {
			getTrackData();
		}
	}, [spotifyApi, session]);

	return (
		<Layout>
			<div className='bg-[#181818] p-5'>
				<div>
					<DetailsHeader
						contentType='track'
						image={
							trackPageState.singleTrack.information.album
								?.images[0]?.url
						}
						title={trackPageState.singleTrack.information.name}
						subtitle={
							trackPageState.singleTrack.information.artists
						}
						detail={trackPageState.singleTrack.information.album?.release_date.slice(
							0,
							4
						)}
						error={trackPageState.singleTrack.errors.information}
					/>

					<div>
						{!trackPageState.singleTrack.errors.information &&
							token && (
								<MusicPlayer
									accessToken={token}
									trackUri={
										trackPageState.singleTrack.information
											.uri
									}
									preview={
										trackPageState.singleTrack.information
											.preview_url
									}
									isPremiumUser={isPremiumUser}
								/>
							)}
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default TrackPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
	const session = await getSession(context);

	const track = context.params?.trackId as string;

	return {
		props: { track, session },
	};
};
