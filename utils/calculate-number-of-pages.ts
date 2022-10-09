const calculateNumberOfPages = (
	maxTotalResultsAllowed: number,
	totalOfResults: number,
	resultsPerPage: number
): number => {
	const totalPages = Math.ceil(
		(totalOfResults > maxTotalResultsAllowed
			? maxTotalResultsAllowed
			: totalOfResults) / resultsPerPage
	);

	return totalPages;
};

export default calculateNumberOfPages;
