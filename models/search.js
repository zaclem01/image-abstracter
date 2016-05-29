var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SearchSchema = new Schema({
	searchTerm: String,
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('Search', SearchSchema);