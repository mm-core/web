// import URLSearchParams from 'url-search-params';

export default function get_query(url: string) {
	if (!url) {
		throw new Error('url could not be null.');
	}
	const s = url.indexOf('?');
	if (s === -1) {
		return {};
	}
	const urlseachparams = new URLSearchParams(url.substring(s + 1));
	const obj: { [key: string]: string } = {};
	urlseachparams.forEach((val, key) => {
		obj[key] = val;
	});
	return obj;

}
