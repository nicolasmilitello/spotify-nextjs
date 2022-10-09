import maxOffsetAllowedByApi from './limit-offset-allowed-by-api';

const numberOfCardsPerPageYourLibraryPage = 12;

const maxTotalNumberOfResultsYourLibraryPage =
	maxOffsetAllowedByApi - numberOfCardsPerPageYourLibraryPage;

export {
	numberOfCardsPerPageYourLibraryPage,
	maxTotalNumberOfResultsYourLibraryPage,
};
