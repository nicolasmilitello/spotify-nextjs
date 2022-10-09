import React, { Dispatch, useRef } from 'react';
import { useEffect, useState } from 'react';

//* action types
import { ActionType } from '../../context/action-types/action-types';

//* components
import Card from '../card/card';
import ContentSeparator from '../content-separator/content-separator';
import ErrorMessage from '../error-message/error-message';
import Loading from '../loading/loading';
import NonNumericPagination from '../non-numeric-pagination/non-numeric-pagination';
import Pagination from '../pagination/pagination';

//* constants
import numberOfAlbumCards from '../../constants/number-of-album-cards';

//* helpers
import generateExternalLink from './helpers/external-link';

//* interfaces
import { CategoryObjectModifiedInterface } from '../../interfaces/category-object-modified-interface';

// type
type CardsContainerPropsType = {
	paginationType:
		| 'paginatedByOffsetInAPI'
		| 'paginatedByAfterInAPI'
		| 'paginatedInFrontend';
	afterParameter?: (string | undefined)[];
	cardsPerPage?: number;
	dataByProps:
		| SpotifyApi.ArtistObjectFull[]
		| SpotifyApi.AlbumObjectSimplified[]
		| SpotifyApi.AlbumObjectFull[]
		| SpotifyApi.PlaylistObjectSimplified[]
		| CategoryObjectModifiedInterface[];
	pathToRedirect: 'album' | 'artist' | undefined;
	hasToBeRedirectToExternalUrl?: boolean;
	totalPages?: number;
	title: string;
	id: string;
	cardsFormat?: 'circle' | 'square';
	actionType?:
		| 'SET_NEW_ALBUMS_RELEASES_OFFSET'
		| 'SET_FEATURED_PLAYLISTS_OFFSET'
		| 'SET_CATEGORIES_OFFSET'
		| 'SET_SINGLE_ARTIST_ALBUMS_OFFSET'
		| 'SET_USER_TOP_ARTISTS_OFFSET'
		| 'SET_USER_FOLLOWED_ARTISTS_AFTER_NEXT'
		| 'SET_SEARCH_ARTIST_RESULTS_OFFSET'
		| 'SET_SEARCH_ALBUM_RESULTS_OFFSET'
		| 'SET_USER_LIBRARY_ALBUMS_OFFSET';
	callback: Dispatch<ActionType>;
	error: string | null;
};

const CardsContainer = ({
	paginationType,
	afterParameter,
	cardsPerPage,
	dataByProps,
	totalPages,
	pathToRedirect,
	hasToBeRedirectToExternalUrl = false,
	title,
	id,
	cardsFormat = 'square',
	actionType,
	callback,
	error,
}: CardsContainerPropsType) => {
	const [data, setData] = useState<
		| SpotifyApi.AlbumObjectSimplified[]
		| SpotifyApi.ArtistObjectFull[]
		| SpotifyApi.AlbumObjectFull[]
		| SpotifyApi.PlaylistObjectSimplified[]
		| CategoryObjectModifiedInterface[]
	>([]);

	const [currentPage, setCurrentPage] = useState(1);

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setCurrentPage(1);
	}, [id]);

	useEffect(() => {
		if (
			typeof currentPage === 'number' &&
			actionType &&
			actionType !== 'SET_USER_FOLLOWED_ARTISTS_AFTER_NEXT'
		) {
			setLoading(true);
			callback({
				type: actionType,
				payload: (currentPage - 1) * numberOfAlbumCards,
			});
			return;
		}

		if (
			typeof currentPage === 'number' &&
			actionType === 'SET_USER_FOLLOWED_ARTISTS_AFTER_NEXT' &&
			afterParameter
		) {
			setLoading(true);
			callback({
				type: actionType,
				payload: afterParameter[currentPage - 1],
			});
			return;
		}

		if (
			typeof currentPage === 'number' &&
			paginationType === 'paginatedInFrontend' &&
			cardsPerPage
		) {
			const indexOfLastPost = currentPage * cardsPerPage;

			const indexOfFirstPost = indexOfLastPost - cardsPerPage;

			const currentData = dataByProps.slice(
				indexOfFirstPost,
				indexOfLastPost
			);

			setData(currentData);
			return;
		}
	}, [currentPage]);

	useEffect(() => {
		if (paginationType === 'paginatedInFrontend') {
			setData(dataByProps.slice(0, cardsPerPage));
			setLoading(false);
		}
	}, [dataByProps]);

	useEffect(() => {
		if (
			paginationType === 'paginatedByOffsetInAPI' ||
			paginationType === 'paginatedByAfterInAPI'
		) {
			setData(dataByProps);

			setLoading(false);
		}
	}, [dataByProps]);

	return (
		<div className="text-white font-montserrat my-3">
			<ContentSeparator />

			<p className="font-montserrat font-bold text-white my-5 text-3xl text-center">
				{title.toUpperCase()}
			</p>

			{error ? <ErrorMessage error={error} /> : null}

			{error ? null : loading ? (
				<Loading />
			) : (
				<div
					className={
						cardsFormat === 'square'
							? 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4'
							: 'grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4'
					}
				>
					{data.map((item) => (
						<Card
							key={item.id}
							cardsFormat={cardsFormat}
							pathToRedirect={
								pathToRedirect ? pathToRedirect : undefined
							}
							externalUrlToRedirect={
								hasToBeRedirectToExternalUrl
									? generateExternalLink(item)
									: undefined
							}
							name={item.name}
							id={item.id}
							image={
								item.type === 'category'
									? item.icons[0]?.url
									: item.images[0]?.url
							}
						/>
					))}
				</div>
			)}

			{paginationType === 'paginatedByAfterInAPI' && (
				<NonNumericPagination
					setCurrentPage={setCurrentPage}
					currentPage={currentPage}
					canGoNext={Boolean(
						(afterParameter as string[])[currentPage]
					)}
				/>
			)}

			{(paginationType === 'paginatedByOffsetInAPI' ||
				paginationType === 'paginatedInFrontend') &&
			totalPages !== undefined &&
			totalPages > 0 ? (
				<Pagination
					setCurrentPage={setCurrentPage}
					pages={totalPages}
					id={id}
				/>
			) : null}
		</div>
	);
};

export default React.memo(CardsContainer);
