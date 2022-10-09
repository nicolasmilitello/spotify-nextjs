import maxOffsetAllowedByApi from './limit-offset-allowed-by-api';

const numberOfCardsPerPageMainPage = 12;

const maxTotalNumberOfResultsMainPage =
	maxOffsetAllowedByApi - numberOfCardsPerPageMainPage;

export { numberOfCardsPerPageMainPage, maxTotalNumberOfResultsMainPage };
