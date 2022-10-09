const handlePrevPage = (
	currentPage: number,
	callback: (page: number) => void
) => {
	if (currentPage === 1) {
		return;
	}

	callback(currentPage - 1);
};

export default handlePrevPage;
