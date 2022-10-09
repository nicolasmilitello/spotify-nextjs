type CheckExistancePropsType =
	| SpotifyApi.ArtistObjectFull[]
	| undefined
	| SpotifyApi.AlbumObjectSimplified[]
	| undefined
	| SpotifyApi.TrackObjectFull[]
	| undefined;

const checkExistance = (data: CheckExistancePropsType) => {
	if (data === undefined || data.length === 0) {
		return false;
	}

	return true;
};

export default checkExistance;
