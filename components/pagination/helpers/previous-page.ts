import { SetStateAction } from 'react';

const previousPage = (
	currentPage: number | string,
	callback: (value: SetStateAction<string | number>) => void
) => {
	if (typeof currentPage === 'number') {
		if (currentPage === 1) {
			return;
		}

		callback(currentPage - 1);
	}
};

export default previousPage;
