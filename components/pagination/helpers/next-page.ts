import { SetStateAction } from 'react';

const nextPage = (
	currentPage: number | string,
	totalNumberOfPages: number,
	callback: (value: SetStateAction<string | number>) => void
) => {
	if (typeof currentPage === 'number') {
		if (currentPage === totalNumberOfPages) {
			return;
		}

		callback(currentPage + 1);
	}
};

export default nextPage;
