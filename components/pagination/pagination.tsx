import { useState, useEffect } from 'react';

//* helpers
import handlePageChange from './helpers/handle-change-page';
import nextPage from './helpers/next-page';
import previousPage from './helpers/previous-page';

// types
type PaginationPropsType = {
	pages: number;
	setCurrentPage: (page: number) => void;
	id: string;
};

const Pagination = ({ pages, setCurrentPage, id }: PaginationPropsType) => {
	const numberOfPages: (string | number)[] = [];

	for (let i = 1; i <= pages; i++) {
		numberOfPages.push(i);
	}

	const [currentButton, setCurrentButton] = useState<number | string>(1);

	const [arrOfCurrButtons, setArrOfCurrButtons] = useState<
		(string | number)[]
	>([]);

	useEffect(() => {
		setCurrentButton(1);
		if (pages <= 5) {
			setArrOfCurrButtons(numberOfPages);
			return;
		}
		setArrOfCurrButtons([1, 2, 3, 4, '...', numberOfPages.length]);
	}, [id, pages]);

	useEffect(() => {
		let tempNumberOfPages = [...arrOfCurrButtons];

		let dotsInitial = '...';
		let dotsLeft = '... ';
		let dotsRight = ' ...';

		if (typeof currentButton === 'number') {
			if (numberOfPages.length < 6) {
				tempNumberOfPages = numberOfPages;
			} else if (currentButton >= 1 && currentButton <= 3) {
				tempNumberOfPages = [
					1,
					2,
					3,
					4,
					dotsInitial,
					numberOfPages.length,
				];
			} else if (currentButton === 4) {
				const sliced = numberOfPages.slice(0, 5);
				tempNumberOfPages = [
					...sliced,
					dotsInitial,
					numberOfPages.length,
				];
			} else if (
				currentButton > 4 &&
				currentButton < numberOfPages.length - 2
			) {
				const sliced1 = numberOfPages.slice(
					currentButton - 2,
					currentButton
				);

				const sliced2 = numberOfPages.slice(
					currentButton,
					currentButton + 1
				);

				tempNumberOfPages = [
					1,
					2,
					dotsLeft,
					...sliced1,
					...sliced2,
					dotsRight,
					numberOfPages.length - 1,
					numberOfPages.length,
				];
			} else if (currentButton > numberOfPages.length - 3) {
				const sliced = numberOfPages.slice(numberOfPages.length - 4);
				tempNumberOfPages = [1, dotsLeft, ...sliced];
			}
		} else if (typeof currentButton === 'string') {
			if (currentButton === dotsInitial) {
				setCurrentButton(
					(arrOfCurrButtons[arrOfCurrButtons.length - 3] as number) +
						1
				);
			} else if (currentButton === dotsRight) {
				setCurrentButton((arrOfCurrButtons[3] as number) + 2);
			} else if (currentButton === dotsLeft) {
				setCurrentButton((arrOfCurrButtons[3] as number) - 2);
			}
		}

		setArrOfCurrButtons(tempNumberOfPages);
		setCurrentPage(currentButton as number);
	}, [currentButton]);

	return (
		<div className="text-white text-center my-4 text-xs sm:text-base">
			<button
				className={`font-bold ${
					currentButton === 1 ? 'text-[#474747]' : ''
				}`}
				disabled={currentButton === 1 ? true : false}
				onClick={() => previousPage(currentButton, setCurrentButton)}
			>
				{'<'}
			</button>

			{arrOfCurrButtons.map((item, index) => {
				return (
					<button
						key={index}
						disabled={currentButton === item ? true : false}
						className={`m-1.5 sm:m-3 ${
							currentButton === item
								? 'text-xl [text-shadow:_0_1px_10px_rgb(255_255_255_/_100%)] text-[#bdbdbd]'
								: ''
						}`}
						onClick={() =>
							handlePageChange(
								currentButton,
								item,
								setCurrentButton
							)
						}
					>
						{item}
					</button>
				);
			})}

			<button
				className={`font-bold ${
					currentButton === numberOfPages.length
						? 'text-[#474747]'
						: ''
				}`}
				disabled={currentButton === numberOfPages.length ? true : false}
				onClick={() =>
					nextPage(
						currentButton,
						numberOfPages.length,
						setCurrentButton
					)
				}
			>
				{'>'}
			</button>
		</div>
	);
}

export default Pagination;
