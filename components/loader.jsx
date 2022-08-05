import styles from '../styles/loader.module.css';

export default function Loader({ width = '20em', height = '2em' }) {
	return (
		<div
			style={{ width: width, height: height }}
			className={styles.loaderContainer}>
			<div className={styles.loader}></div>
		</div>
	);
}
