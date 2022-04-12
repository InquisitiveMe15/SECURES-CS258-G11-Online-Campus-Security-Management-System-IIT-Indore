const mongoose = require('mongoose');

var incidents =new mongoose.Schema({

	heading: String,
	location: String,
	date: Number,
	description: String,
	precaution: String,

});

module.exports = mongoose.model("incidents", incidents);