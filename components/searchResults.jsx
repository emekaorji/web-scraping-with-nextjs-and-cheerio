import styles from '../styles/searchResult.module.css';
import { Location } from './icon';
import Loader from './loader';

export default function SearchResults({ searchResult, isLoadingMore }) {
	return (
		<ul>
			{searchResult.length !== 0 &&
				searchResult?.map((result, index) => (
					<li key={index} className={styles.card}>
						<div className={styles.cardTitle}>
							<a href={result.jobLink}>
								<h1>{result.jobTitle}</h1>
							</a>
							<h2>{result.jobAge}</h2>
						</div>
						<div className={styles.tags}>
							<span>{result.jobTags.tag0}</span>
							<span>{result.jobTags.tag1}</span>
						</div>
						<div className={styles.description}>{result.jobDescription}</div>
						<div className={styles.location}>
							<Location size='1.5em' />
							&nbsp;
							{result.jobLocation}
						</div>
					</li>
				))}
			<br />
			<br />
			{isLoadingMore && <Loader width='10em' height='.5em' />}
		</ul>
	);
}
