import React from 'react';
import { render, screen } from '@testing-library/react';

//* components
import Card from '../card';

describe('The Card component', () => {
	const artistName = 'The Beatles';
	const imageSrc =
		'https://i.scdn.co/image/ab67616d0000b27304167cd5b7ddbf5c4a563456';
	const externalUrl =
		'https://open.spotify.com/playlist/37i9dQZF1DXbTxeAdrVG2l';

	describe('with an internal link should render', () => {
		beforeEach(() => {
			render(
				<Card
					cardsFormat="circle"
					pathToRedirect="artist"
					externalUrlToRedirect={undefined}
					image={imageSrc}
					name={artistName}
					id="3WrFJ7ztbogyGnTHbHJFl2"
				/>
			);
		});

		it('the name of the artist', () => {
			expect(screen.getAllByText(artistName)).toBeTruthy();
		});

		it('an image with the given source', () => {
			const image = screen.getByRole('img');

			expect(image).toBeInTheDocument();

			expect(image).toHaveAttribute('src', imageSrc);
		});
	});

	describe('with an external link should render', () => {
		beforeEach(() => {
			render(
				<Card
					cardsFormat="square"
					pathToRedirect={undefined}
					externalUrlToRedirect={externalUrl}
					image="https://i.scdn.co/image/ab67706f00000003b97bee9f7b0365327223f7d1"
					name="All Out 90s"
					id="37i9dQZF1DXbTxeAdrVG2l"
				/>
			);
		});

		it('an anchor tag if the card receives an external url by props', () => {
			const link = screen.getByRole('link');

			expect(link).toBeInTheDocument();

			expect(link).toHaveAttribute('href', externalUrl);
		});
	});
});
