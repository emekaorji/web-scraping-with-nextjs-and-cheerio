import getScrapedJobs from './webScraper';

const loadMoreData = async (
	pageQuery,
	setSearchResult,
	currentPage,
	setCurrentPage
) => {
	console.log('Loading More');
	const { results } = await getScrapedJobs(pageQuery);
	console.log('Loading More Done');
	console.log(pageQuery);

	setSearchResult((prevResult) => prevResult.concat(results));
	setCurrentPage(currentPage + 1);
};

export { loadMoreData };
