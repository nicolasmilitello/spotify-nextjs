//* helpers
import handleNextPage from './helpers/handle-next-page';
import handlePrevPage from './helpers/handle-prev-page';

type NonNumericPaginationPropsType = {
	currentPage: number;
	setCurrentPage: (page: number) => void;
	canGoNext: boolean;
};

const NonNumericPagination = ({
	currentPage,
	setCurrentPage,
	canGoNext,
}: NonNumericPaginationPropsType) => {
	return (
		<div className="text-white flex justify-center my-4 text-base">
			<button
				className={`mr-4 font-bold ${
					currentPage === 1 ? 'text-[#474747] cursor-default' : ''
				}`}
				disabled={currentPage === 1 ? true : false}
				onClick={() => handlePrevPage(currentPage, setCurrentPage)}
			>
				{'<'}
			</button>

			<p className="text-white mx-2">{currentPage}</p>

			<button
				className={`ml-4 font-bold ${
					canGoNext ? '' : 'text-[#474747] cursor-default'
				}`}
				disabled={!canGoNext}
				onClick={() =>
					handleNextPage(currentPage, setCurrentPage, canGoNext)
				}
			>
				{'>'}
			</button>
		</div>
	);
};

export default NonNumericPagination;
