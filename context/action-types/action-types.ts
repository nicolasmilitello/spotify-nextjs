//* interfaces
import { CategoryObjectModifiedInterface } from '../../interfaces/category-object-modified-interface';

export type ActionType =
	// featured playlists actions
	| {
			type: 'SET_FEATURED_PLAYLISTS';
			payload: SpotifyApi.PlaylistObjectSimplified[];
	  }
	| {
			type: 'SET_FEATURED_PLAYLISTS_OFFSET';
			payload: number;
	  }
	| {
			type: 'SET_FEATURED_PLAYLISTS_TOTAL_PAGES';
			payload: number;
	  }
	| {
			type: 'SET_FEATURED_PLAYLISTS_ERROR';
			payload: string | null;
	  }
	// new album releases actions
	| {
			type: 'SET_NEW_ALBUMS_RELEASES';
			payload: SpotifyApi.AlbumObjectSimplified[];
	  }
	| {
			type: 'SET_NEW_ALBUMS_RELEASES_OFFSET';
			payload: number;
	  }
	| {
			type: 'SET_NEW_ALBUMS_RELEASES_TOTAL_PAGES';
			payload: number;
	  }
	| {
			type: 'SET_NEW_ALBUMS_RELEASES_ERROR';
			payload: string | null;
	  }
	// categories actions
	| {
			type: 'SET_CATEGORIES';
			payload: CategoryObjectModifiedInterface[];
	  }
	| {
			type: 'SET_CATEGORIES_OFFSET';
			payload: number;
	  }
	| {
			type: 'SET_CATEGORIES_TOTAL_PAGES';
			payload: number;
	  }
	| {
			type: 'SET_CATEGORIES_ERROR';
			payload: string | null;
	  }
	// artist information actions
	| {
			type: 'SET_SINGLE_ARTIST_INFORMATION';
			payload: SpotifyApi.SingleArtistResponse;
	  }
	| {
			type: 'SET_SINGLE_ARTIST_INFORMATION_ERROR';
			payload: string | null;
	  }
	// artist top tracks actions
	| {
			type: 'SET_SINGLE_ARTIST_TOP_TRACKS';
			payload: SpotifyApi.TrackObjectFull[];
	  }
	| {
			type: 'SET_SINGLE_ARTIST_TOP_TRACKS_ERROR';
			payload: string | null;
	  }
	// artist albums actions
	| {
			type: 'SET_ARTIST_LAST_SINGLE';
			payload: SpotifyApi.AlbumObjectSimplified[];
	  }
	| {
			type: 'SET_ARTIST_LAST_SINGLE_ERROR';
			payload: string | null;
	  }
	| {
			type: 'SET_SINGLE_ARTIST_ALBUMS';
			payload: SpotifyApi.AlbumObjectSimplified[];
	  }
	| {
			type: 'SET_SINGLE_ARTIST_ALBUMS_OFFSET';
			payload: number;
	  }
	| {
			type: 'SET_SINGLE_ARTIST_ALBUMS_TOTAL_PAGES';
			payload: number;
	  }
	| {
			type: 'SET_SINGLE_ARTIST_ALBUMS_ERROR';
			payload: string | null;
	  }
	// artist related artists actions
	| {
			type: 'SET_SINGLE_ARTIST_RELATED_ARTISTS';
			payload: SpotifyApi.ArtistObjectFull[];
	  }
	| {
			type: 'SET_SINGLE_ARTIST_RELATED_ARTISTS_ERROR';
			payload: string | null;
	  }
	| {
			type: 'SET_SINGLE_ARTIST_RELATED_ARTISTS_TOTAL_PAGES';
			payload: number;
	  }
	// album information actions
	| {
			type: 'SET_SINGLE_ALBUM_INFORMATION';
			payload: SpotifyApi.SingleAlbumResponse;
	  }
	| {
			type: 'SET_SINGLE_ALBUM_INFORMATION_ERROR';
			payload: string | null;
	  }
	// album tracks actions
	| {
			type: 'SET_SINGLE_ALBUM_TRACKS';
			payload: SpotifyApi.TrackObjectSimplified[];
	  }
	| {
			type: 'SET_SINGLE_ALBUM_TRACKS_OFFSET';
			payload: number;
	  }
	| {
			type: 'SET_SINGLE_ALBUM_TRACKS_TOTAL_PAGES';
			payload: number;
	  }
	| {
			type: 'SET_SINGLE_ALBUM_TRACKS_ERROR';
			payload: string | null;
	  }
	// track information actions
	| {
			type: 'SET_SINGLE_TRACK_INFORMATION';
			payload: SpotifyApi.SingleTrackResponse;
	  }
	| {
			type: 'SET_SINGLE_TRACK_INFORMATION_ERROR';
			payload: string | null;
	  }
	// user information actions
	| {
			type: 'SET_USER_INFORMATION';
			payload: SpotifyApi.CurrentUsersProfileResponse;
	  }
	| {
			type: 'SET_USER_INFORMATION_ERROR';
			payload: string | null;
	  }
	// user top artists actions
	| {
			type: 'SET_USER_TOP_ARTISTS';
			payload: SpotifyApi.ArtistObjectFull[];
	  }
	| {
			type: 'SET_USER_TOP_ARTISTS_OFFSET';
			payload: number;
	  }
	| {
			type: 'SET_USER_TOP_ARTISTS_TOTAL_PAGES';
			payload: number;
	  }
	| {
			type: 'SET_USER_TOP_ARTISTS_ERROR';
			payload: string | null;
	  }
	// user top tracks actions
	| {
			type: 'SET_USER_TOP_TRACKS';
			payload: SpotifyApi.TrackObjectFull[];
	  }
	| {
			type: 'SET_USER_TOP_TRACKS_OFFSET';
			payload: number;
	  }
	| {
			type: 'SET_USER_TOP_TRACKS_TOTAL_PAGES';
			payload: number;
	  }
	| {
			type: 'SET_USER_TOP_TRACKS_ERROR';
			payload: string | null;
	  }
	// user followed artists actions
	| {
			type: 'SET_USER_FOLLOWED_ARTISTS';
			payload: SpotifyApi.ArtistObjectFull[];
	  }
	| {
			type: 'SET_USER_FOLLOWED_ARTISTS_AFTER_NEXT';
			payload: string | undefined;
	  }
	| {
			type: 'SET_USER_FOLLOWED_ARTISTS_BEFORE';
			payload: string | undefined;
	  }
	| {
			type: 'SET_USER_FOLLOWED_ARTISTS_ERROR';
			payload: string | null;
	  }
	// artist results actions
	| {
			type: 'SET_SEARCH_ARTIST_RESULTS';
			payload: SpotifyApi.ArtistObjectFull[] | undefined;
	  }
	| {
			type: 'SET_SEARCH_ARTIST_RESULTS_OFFSET';
			payload: number | undefined;
	  }
	| {
			type: 'SET_SEARCH_ARTIST_RESULTS_TOTAL_PAGES';
			payload: number | undefined;
	  }
	| {
			type: 'SET_SEARCH_ARTIST_RESULTS_ERROR';
			payload: string | null;
	  }
	// album results actions
	| {
			type: 'SET_SEARCH_ALBUM_RESULTS';
			payload: SpotifyApi.AlbumObjectSimplified[] | undefined;
	  }
	| {
			type: 'SET_SEARCH_ALBUM_RESULTS_OFFSET';
			payload: number | undefined;
	  }
	| {
			type: 'SET_SEARCH_ALBUM_RESULTS_TOTAL_PAGES';
			payload: number | undefined;
	  }
	| {
			type: 'SET_SEARCH_ALBUM_RESULTS_ERROR';
			payload: string | null;
	  }
	// track results actions
	| {
			type: 'SET_SEARCH_TRACK_RESULTS';
			payload: SpotifyApi.TrackObjectFull[] | undefined;
	  }
	| {
			type: 'SET_SEARCH_TRACK_RESULTS_OFFSET';
			payload: number | undefined;
	  }
	| {
			type: 'SET_SEARCH_TRACK_RESULTS_TOTAL_PAGES';
			payload: number | undefined;
	  }
	| {
			type: 'SET_SEARCH_TRACK_RESULTS_ERROR';
			payload: string | null;
	  }
	// clean results action
	| {
			type: 'CLEAR_SEARCH_RESULTS';
	  }
	// user library albums actions
	| {
			type: 'SET_USER_LIBRARY_ALBUMS';
			payload: SpotifyApi.AlbumObjectFull[];
	  }
	| {
			type: 'SET_USER_LIBRARY_ALBUMS_OFFSET';
			payload: number;
	  }
	| {
			type: 'SET_USER_LIBRARY_ALBUMS_TOTAL_PAGES';
			payload: number;
	  }
	| {
			type: 'SET_USER_LIBRARY_ALBUMS_ERROR';
			payload: string | null;
	  }
	// user library tracks actions
	| {
			type: 'SET_USER_LIBRARY_TRACKS';
			payload: SpotifyApi.TrackObjectFull[];
	  }
	| {
			type: 'SET_USER_LIBRARY_TRACKS_OFFSET';
			payload: number;
	  }
	| {
			type: 'SET_USER_LIBRARY_TRACKS_TOTAL_PAGES';
			payload: number;
	  }
	| {
			type: 'SET_USER_LIBRARY_TRACKS_ERROR';
			payload: string | null;
	  };
