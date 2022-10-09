import { CategoryObjectModifiedInterface } from '../../interfaces/category-object-modified-interface';

export type MainPageInitialStateType = {
	featuredPlaylists: {
		data: SpotifyApi.PlaylistObjectSimplified[];
		offset: number;
		totalPages: number;
	};
	newAlbumReleases: {
		data: SpotifyApi.AlbumObjectSimplified[];
		offset: number;
		totalPages: number;
	};
	categories: {
		data: CategoryObjectModifiedInterface[];
		offset: number;
		totalPages: number;
	};
	errors: {
		featuredPlaylists: string | null;
		newAlbumReleases: string | null;
		categories: string | null;
	};
};

export const MainPageInitialState: MainPageInitialStateType = {
	featuredPlaylists: {
		data: [],
		offset: 0,
		totalPages: 0,
	},
	newAlbumReleases: {
		data: [],
		offset: 0,
		totalPages: 0,
	},
	categories: {
		data: [],
		offset: 0,
		totalPages: 0,
	},
	errors: {
		featuredPlaylists: null,
		newAlbumReleases: null,
		categories: null,
	},
};
