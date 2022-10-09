import { SetStateAction } from 'react';

const handlePageChange = (
	currentPage: number | string,
	pageToGo: number | string,
	callback: (value: SetStateAction<string | number>) => void
) => {
	if (typeof currentPage === 'number' && typeof pageToGo === 'number') {
		if (currentPage === pageToGo) {
			return;
		}

		callback(pageToGo);
	} else if (typeof pageToGo === 'string') {
		callback(pageToGo);
	}
};

export default handlePageChange;
