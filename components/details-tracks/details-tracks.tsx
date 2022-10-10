import React, { Dispatch, useEffect, useState } from 'react';

//* action types
import { ActionType } from '../../context/action-types/action-types';

//* components
import Track from '../track/track';
import Pagination from '../pagination/pagination';
import Loading from '../loading/loading';
import ErrorMessage from '../error-message/error-message';

// types
type DetailsTracksPropsType = {
	id?: string;
	title: string;
	parentComponent: 'artist' | 'album';
	tracks: SpotifyApi.TrackObjectFull[] | SpotifyApi.TrackObjectSimplified[];
	image?: string;
	actionType?:
		| 'SET_SINGLE_ALBUM_TRACKS_OFFSET'
		| 'SET_USER_TOP_TRACKS_OFFSET'
		| 'SET_SEARCH_TRACK_RESULTS_OFFSET'
		| 'SET_USER_LIBRARY_TRACKS_OFFSET';
	tracksPerPage: number;
	totalPages?: number;
	hasToBePaginated: boolean;
	callback: Dispatch<ActionType>;
	error: string | null;
};

const DetailsTracks = ({
	id,
	title,
	parentComponent,
	tracks,
	image,
	actionType,
	tracksPerPage,
	totalPages,
	hasToBePaginated,
	callback,
	error,
}: DetailsTracksPropsType) => {
	const [currentPage, setCurrentPage] = useState(1);

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (typeof currentPage === 'number' && actionType && tracksPerPage) {
			setLoading(true);
			callback({
				type: actionType,
				payload: (currentPage - 1) * tracksPerPage,
			});
		}
	}, [currentPage]);

	useEffect(() => {
		setLoading(false);
	}, [tracks]);

	return (
		<div className="py-4">
			<h3 className="font-montserrat font-bold text-white my-5 text-3xl text-center">
				{title.toUpperCase()}
			</h3>

			{loading && <Loading />}

			{error ? <ErrorMessage error={error} /> : null}

			{!loading &&
				typeof currentPage === 'number' &&
				tracks?.map((track, index) => (
					<Track
						key={track.id}
						id={track.id}
						trackNumber={
							index + 1 + (currentPage - 1) * tracksPerPage
						}
						image={
							image
								? image
								: (track as SpotifyApi.TrackObjectFull).album
										?.images[0].url
						}
						name={track.name}
						album={{
							name: (track as SpotifyApi.TrackObjectFull).album
								?.name,
							id: (track as SpotifyApi.TrackObjectFull).album?.id,
						}}
						artists={
							parentComponent === 'artist'
								? undefined
								: track.artists
						}
					/>
				))}

			{hasToBePaginated && id && totalPages ? (
				<Pagination
					setCurrentPage={setCurrentPage}
					pages={totalPages}
					id={id}
				/>
			) : null}
		</div>
	);
};

export default React.memo(DetailsTracks);
