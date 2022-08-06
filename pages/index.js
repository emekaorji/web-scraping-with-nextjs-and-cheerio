// Hooks and Modules
import { useState, useEffect } from 'react';

// Components
import SearchForm from '../components/searchForm';
import SearchResults from '../components/searchResults';
import Footer from '../components/footer';

// Functions
import getScrapedJobs from '../assets/js/webScraper';

export async function getServerSideProps({ query }) {
	const results = await getScrapedJobs(query);

	return {
		props: { results, query },
	};
}

export default function Home({ results, query }) {
	const [searchResult, setSearchResult] = useState([]);

	useEffect(() => {
		setSearchResult(results);
	}, []);

	return (
		<>
			<div id='app'>
				<main>
					<SearchForm query={query} />
					<SearchResults searchResult={searchResult} />
				</main>
				<Footer />
			</div>
		</>
	);
}
