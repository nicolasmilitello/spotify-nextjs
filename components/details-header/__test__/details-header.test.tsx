import React from 'react';
import { render, screen } from '@testing-library/react';
import DetailsHeader from '../details-header';

describe('The DetailsHeader component', () => {
	const artistName = 'The Beatles';
	const imageSrc =
		'https://i.scdn.co/image/ab67616d0000b27304167cd5b7ddbf5c4a563456';
	const externalUrl =
		'https://open.spotify.com/playlist/37i9dQZF1DXbTxeAdrVG2l';

	describe('for an artist should render', () => {
		it('the name of the artist', () => {
			render(
				<DetailsHeader
					contentType="artist"
					image={imageSrc}
					title={artistName}
					error={null}
				/>
			);

			expect(screen.getAllByText(artistName)).toBeTruthy();
		});

		it('an image with the given source', () => {
			render(
				<DetailsHeader
					contentType="artist"
					image={imageSrc}
					title={artistName}
					error={null}
				/>
			);

			const image = screen.getAllByRole('img')[0];

			expect(image).toBeInTheDocument();

			expect(image).toHaveAttribute('src', imageSrc);
		});

		it('an error message if an error occurs', () => {
			const errorMessage = 'Error message';

			render(
				<DetailsHeader
					contentType="artist"
					image={imageSrc}
					title={artistName}
					error={errorMessage}
				/>
			);

			expect(screen.getAllByText(errorMessage)).toBeTruthy();

		});
	});
});
