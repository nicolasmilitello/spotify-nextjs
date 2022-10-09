import maxOffsetAllowedByApi from './limit-offset-allowed-by-api';

const numberOfResultsPerPage = 12;

const maxTotalNumberOfResults = maxOffsetAllowedByApi - numberOfResultsPerPage;

export { numberOfResultsPerPage, maxTotalNumberOfResults };
