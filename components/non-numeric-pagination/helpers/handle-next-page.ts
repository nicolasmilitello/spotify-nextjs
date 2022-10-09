const handleNextPage = (
	currentPage: number,
	callback: (page: number) => void,
	canGoNext: boolean
) => {
	if (!canGoNext) {
		return;
	}

	callback(currentPage + 1);
};

export default handleNextPage;
