const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema(
	{
		originalUrl: {
			type: String,
			required: true,
		},
		shortUrl: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const urlModel = mongoose.model('urls', urlSchema);
module.exports = urlModel;
