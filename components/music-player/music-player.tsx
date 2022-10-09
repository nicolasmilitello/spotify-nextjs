import { useState } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';

//* components
import ErrorMessage from '../error-message/error-message';

//* constants
import spotifyPlayerStyles from '../../constants/spotify-player-styles';

// types
type MusicPlayerPropsType = {
	accessToken: string;
	trackUri: string;
	preview: string | null;
	isPremiumUser: boolean;
};

export default function Player({
	accessToken,
	trackUri,
	preview,
	isPremiumUser,
}: MusicPlayerPropsType) {
	const [play, setPlay] = useState(false);

	if (!accessToken) return null;
	return (
		<>
			{isPremiumUser ? (
				<SpotifyPlayer
					token={accessToken}
					callback={(state) => {
						if (!state.isPlaying) setPlay(false);
					}}
					play={play}
					uris={trackUri ? [trackUri] : []}
					styles={spotifyPlayerStyles}
				/>
			) : preview ? (
				<audio controls className="w-full my-10" src={preview}></audio>
			) : (
				<div className="my-20">
					<ErrorMessage
						error="We are sorry but due to copyright reasons the preview of this
				song cannot be played."
					/>
				</div>
			)}
		</>
	);
}
