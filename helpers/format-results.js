module.exports = function formatSearchResults(json) {
	var output = [];
	json.forEach((result) => {
		var tmp = {
			title: result.title,
			link: result.link,
			snippet: result.snippet,
			context: result.image.contextLink
		}
		output.push(tmp);
	});

	return output;
}