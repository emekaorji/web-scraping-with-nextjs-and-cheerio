// Hooks and Modules
import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';

// Components
import SearchForm from '../components/searchForm';
import SearchResults from '../components/searchResults';
import Footer from '../components/footer';

// Functions
import getScrapedJobs from '../assets/js/webScraper';
import useDidUpdateEffect from '../hooks/useDidUpdateEffect';
import { loadMoreData } from '../assets/js/dataFetcher';

export async function getServerSideProps({ query }) {
	const data = await getScrapedJobs(query);

	return {
		props: { data, query },
	};
}

export default function Home({ data, query }) {
	const router = useRouter();

	const [searchQuery, setSearchQuery] = useState(query);
	const [pageQuery, setPageQuery] = useState({});
	const [searchResult, setSearchResult] = useState([]);
	const [resultCount, setResultCount] = useState(0);
	const [currentPage, setCurrentPage] = useState(1);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isLoadingMore, setIsLoadingMore] = useState(false);

	useEffect(() => {
		const { results, numberOfResults } = data;
		setSearchResult(results);
		setResultCount(numberOfResults);
	}, []);

	useDidUpdateEffect(async () => {
		const { job, location } = searchQuery;
		const formattedJob = job?.replace(' ', '+');
		const formattedLocation = location?.replace(' ', '+');
		if (!formattedJob) return;
		await (formattedJob && formattedLocation
			? router.push(`?search=${formattedJob}&location=${formattedLocation}`)
			: router.push(`?search=${formattedJob}`));
		router.reload();
	}, [searchQuery]);

	useDidUpdateEffect(async () => {
		setIsLoadingMore(true);
		console.log('loading more data');
		await loadMoreData(pageQuery, setSearchResult, currentPage, setCurrentPage);

		setIsLoadingMore(false);
	}, [pageQuery]);

	const loadMoreAtBottom = useCallback(() => {
		const app = document.getElementById('app');
		const isBottomOfPage =
			window.innerHeight + window.scrollY >= app.scrollHeight - 3400;

		if (isBottomOfPage) {
			console.log('You are at the bottom of the page');
			setPageQuery((pageQuery) => ({
				...pageQuery,
				search: searchQuery.search,
				location: searchQuery.location || '',
				pageNumber: currentPage + 1,
			}));
			window.removeEventListener('scroll', loadMoreAtBottom);
		}
	}, [currentPage, searchQuery]);

	useEffect(() => {
		const unsubscribe = () => {
			if (searchResult.length >= resultCount) return;
			window.addEventListener('scroll', loadMoreAtBottom);
		};

		return unsubscribe();
	}, [currentPage, searchResult, resultCount]);

	return (
		<>
			<div id='app'>
				<main>
					<SearchForm
						setSearchQuery={setSearchQuery}
						searchQuery={searchQuery}
						isSubmitting={isSubmitting}
						setIsSubmitting={setIsSubmitting}
					/>
					<SearchResults
						searchResult={searchResult}
						isLoadingMore={isLoadingMore}
					/>
				</main>
				<Footer />
			</div>
		</>
	);
}
