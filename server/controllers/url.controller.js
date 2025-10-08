const urlModel = require('../models/url.model');
const generateShortCode = require('../utils/urlGenerator');

async function generateShortUrl(req, res) {
	try {
		const { originalUrl } = req.body;

		if (!originalUrl) {
			return res.status(400).json({ message: 'Original URL is required' });
		}

		let existing = await urlModel.findOne({ originalUrl });
		if (existing) {
			return res.status(200).json({
				message: 'URL already exists',
				shortUrl: existing.shortUrl,
			});
		}

		let shortCode = generateShortCode(7);
		let shortUrl = `${BASE_URL}/${shortCode}`;

		while (await urlModel.findOne({ shortUrl })) {
			shortCode = generateShortCode(7);
			shortUrl = `${BASE_URL}/${shortCode}`;
		}

		const newUrl = new urlModel({ originalUrl, shortUrl });
		await newUrl.save();

		return res.status(201).json({
			message: 'Short URL created successfully',
			shortUrl,
		});
	} catch (error) {
		console.error('Error in shortenUrl:', error);
		return res.status(500).json({
			message: 'Internal Server Error',
			error: error.message,
		});
	}
}

module.exports = {
	generateShortUrl,
};
