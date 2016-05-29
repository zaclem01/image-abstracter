var express = require('express');
var google = require('googleapis');
var router = express.Router();
var customsearch = google.customsearch('v1');
var Search = require('../models/search');
var formatResults = require('../helpers/format-results');

router.get('/', (req, res) => {
	res.send('This is the searches home route');
});

router.get('/latest', (req, res) => {
	getLatest((err, searches) => {
		if (err) return console.error('Could not find latest searches');
		res.json(searches);
	});
})

router.get('/new/:search', (req, res) => {
	var newSearch = req.params.search;
	var startIndex = +req.query.offset ? (+req.query.offset - 1) * 10 + 1 : 1;
	var searchParams = {
		cx: process.env.CX,
		auth: process.env.API_KEY,
		q: newSearch,
		start: startIndex,
		searchType: 'image'
	};

	customsearch.cse.list(searchParams, (err, resp) => {
		if (err) return console.error('Could not complete the search', err);
		saveSearch(newSearch, (err, savedSearch) => {
			if (err) return console.error('Could not save search');
		});
		res.json(formatResults(resp.items));
	});
});

function getLatest(callback) {
	Search.find(
		{},
		{_id: 0, __v: 0}
	).
	limit(10).
	sort({ date: -1 }).
	exec((err, searches) => {
		if (err) return callback(err);
		return callback(null, searches);
	});
}

function saveSearch(search, callback) {
	Search.create({
		searchTerm: search
	}, (err, savedSearch) => {
		if (err) return callback(err);
		return callback(null, savedSearch);
	});
}

module.exports = router;