import { CategoryObjectModifiedInterface } from '../../../interfaces/category-object-modified-interface';

type ItemType =
	| SpotifyApi.ArtistObjectFull
	| SpotifyApi.AlbumObjectSimplified
	| SpotifyApi.AlbumObjectFull
	| SpotifyApi.PlaylistObjectSimplified
	| CategoryObjectModifiedInterface;

const generateExternalLink = (item: ItemType) => {
	if (item.type === 'category') {
		return item.href;
	}

	return item.external_urls.spotify;
};

export default generateExternalLink;
