import singleAlbumResponse from '../../mocks/single-album-response.json';
import { AlbumPageReducer } from '../albums-page-reducer';
import trackObjectSimplified from '../../mocks/track-object-simplified.json';

describe('The reducer for the Albums Page', () => {
	const initialState = {
		singleAlbum: {
			information: {} as SpotifyApi.SingleAlbumResponse,
			tracks: {
				data: [],
				offset: 0,
				totalPages: 0,
			},
			errors: {
				information: null,
				tracks: null,
			},
		},
	};

	it('should add the album information', () => {
		const actionToDispatch = {
			type: 'SET_SINGLE_ALBUM_INFORMATION' as const,
			payload: singleAlbumResponse as SpotifyApi.SingleAlbumResponse,
		};

		const updatedState = AlbumPageReducer(initialState, actionToDispatch);

		expect(updatedState.singleAlbum.information).toEqual(
			singleAlbumResponse
		);
	});

	it('should add an error if the album data could not be got it', () => {
		const errorMessage = 'error';

		const actionToDispatch = {
			type: 'SET_SINGLE_ALBUM_INFORMATION_ERROR' as const,
			payload: errorMessage,
		};

		const updatedState = AlbumPageReducer(initialState, actionToDispatch);

		expect(updatedState.singleAlbum.errors.information).toEqual(
			errorMessage
		);
	});

	it('should add the album`s tracks', () => {
		const actionToDispatch = {
			type: 'SET_SINGLE_ALBUM_TRACKS' as const,
			payload:
				trackObjectSimplified as SpotifyApi.TrackObjectSimplified[],
		};

		const updatedState = AlbumPageReducer(initialState, actionToDispatch);

		expect(updatedState.singleAlbum.tracks.data).toEqual(
			trackObjectSimplified
		);
	});

	it('should add the offset', () => {
		const offset = 12;

		const actionToDispatch = {
			type: 'SET_SINGLE_ALBUM_TRACKS_OFFSET' as const,
			payload: offset,
		};

		const updatedState = AlbumPageReducer(initialState, actionToDispatch);

		expect(updatedState.singleAlbum.tracks.offset).toEqual(offset);
	});

	it('should add the total pages', () => {
		const totalPages = 20;

		const actionToDispatch = {
			type: 'SET_SINGLE_ALBUM_TRACKS_TOTAL_PAGES' as const,
			payload: totalPages,
		};

		const updatedState = AlbumPageReducer(initialState, actionToDispatch);

		expect(updatedState.singleAlbum.tracks.totalPages).toEqual(totalPages);
	});

	it('should add an error if the album tracks could not be got it', () => {
		const errorMessage = 'error';

		const actionToDispatch = {
			type: 'SET_SINGLE_ALBUM_TRACKS_ERROR' as const,
			payload: errorMessage,
		};

		const updatedState = AlbumPageReducer(initialState, actionToDispatch);

		expect(updatedState.singleAlbum.errors.tracks).toEqual(errorMessage);
	});
});
