import styles from '../styles/searchForm.module.css';

import { useEffect, useState } from 'react';
import Loader from './loader';
import loudIt from '../utils/loudIt';
import { useRouter } from 'next/router';

export default function SearchForm({ query }) {
	const router = useRouter();

	const [searchValue, setSearchValue] = useState('');
	const [locationValue, setLocationValue] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);

	useEffect(() => {
		if (!query) return;
		const { search, location } = query;
		setSearchValue(search || '');
		setLocationValue(location || '');
	}, []);

	const getQueryUrl = () => {
		const formattedJob = searchValue?.replace(' ', '+');
		const formattedLocation = locationValue?.replace(' ', '+');
		const queryUrl =
			formattedJob && formattedLocation
				? `?search=${formattedJob}&location=${formattedLocation}`
				: `?search=${formattedJob}`;

		if (!formattedJob) return;

		return queryUrl;
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		if (searchValue === '') {
			loudIt('Put in a job search value', {
				position: 'center',
				background: '#646cff',
			});
			return;
		}

		const queryUrl = getQueryUrl();
		if (!queryUrl || router.asPath.endsWith(queryUrl)) return;

		setIsSubmitting(true);
		router.push(queryUrl).then(() => router.reload());
	};

	return (
		<form className={styles.form} onSubmit={handleSubmit}>
			<input
				className={styles.input}
				type='text'
				value={searchValue}
				onInput={(e) => setSearchValue(e.target.value)}
				placeholder='Search for jobs'
				disabled={isSubmitting}
			/>
			<input
				className={styles.input}
				type='text'
				value={locationValue}
				onInput={(e) => setLocationValue(e.target.value)}
				placeholder='Search location'
				disabled={isSubmitting}
			/>
			<button className={styles.button} type='submit'>
				Search
			</button>
			{isSubmitting && (
				<div className={styles.formDisabledCover}>
					<Loader width='10em' height='.2em' />
				</div>
			)}
		</form>
	);
}
