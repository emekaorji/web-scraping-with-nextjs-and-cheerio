import cheerio from 'cheerio';
import axios from 'axios';

function updateResultsArray($, results) {
	$('#job-list li').each(function (i, _elem) {
		results[i].id = i + 1;
	});
	$('#job-list li .job-title').each(function (i, elem) {
		results[i].jobTitle = $(elem).text().trim();
	});
	$('#job-list li .job-link').each(function (i, elem) {
		results[i].jobLink = `https://www.flexjobs.com${$(elem).attr('href')}`;
	});
	$('#job-list li .job-age').each(function (i, elem) {
		results[i].jobAge = $(elem).text().trim();
	});
	$('#job-list li .job-tags').each(function (i, elem) {
		results[i].jobTags = {};
		$(elem)
			.children()
			.each(function (i2, elem2) {
				results[i].jobTags[`tag${i2}`] = $(elem2).text().trim();
			});
	});
	$('#job-list li .job-locations').each(function (i, elem) {
		results[i].jobLocation = $(elem).text().split('&')[0].trim();
	});
	$('#job-list li .job-description').each(function (i, elem) {
		results[i].jobDescription = $(elem).text().trim();
	});
}

async function getResults(job, location, pageNumber) {
	const { data } = await axios.get(
		`https://www.flexjobs.com/search?page=${pageNumber}&search=${job}&location=${location}`
	);
	const $ = cheerio.load(data);

	let results = [];
	const jobsLength = $('#job-list li').length;
	for (let i = 0; i < jobsLength; i++) {
		results.push({});
	}

	updateResultsArray($, results);

	return results;
}

export default async function getScrapedJobs(query) {
	if (Object.keys(query).length === 0 || !query.search) return [];

	const job = await query.search?.replace(' ', '+');
	const location = (await query.location?.replace(' ', '+')) || '';
	const pageNumber = (await query.pageNumber) || 1;

	const results = await getResults(job, location, pageNumber);

	return results;
}
