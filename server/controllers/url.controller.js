const urlModel = require('../models/url.model');
const generateShortCode = require('../utils/urlGenerator');
const BASE_URL = 'http://';

async function generateShortUrl(req, res) {
	try {
		const { originalUrl } = req.body;

		if (!originalUrl) {
			return res.status(400).json({ message: 'Original URL is required' });
		}

		let existingOriginal = await urlModel.findOne({ originalUrl });
		if (existingOriginal) {
			return res.status(200).json({
				message: 'URL already exists',
				shortUrl: existingOriginal.shortUrl,
			});
		}

		let shortCode = generateShortCode(5);
		let shortUrl = `${BASE_URL}${shortCode}.tiny`;

		while (await urlModel.findOne({ shortUrl })) {
			shortCode = generateShortCode(5);
			shortUrl = `${BASE_URL}${shortCode}.tiny`;
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

async function generateOriginalUrl(req, res) {
	try {
		const { shortUrl } = req.body;

		if (!shortUrl) {
			return res.status(400).json({ message: 'Short URL is required' });
		}

		const existing = await urlModel.findOne({ shortUrl });

		if (!existing) {
			return res.status(404).json({ message: 'Short URL not found' });
		}

		return res.status(200).json({
			message: 'Original URL found',
			originalUrl: existing.originalUrl,
		});
	} catch (error) {
		console.error('Error in generateOriginalUrl:', error);
		return res.status(500).json({
			message: 'Internal Server Error',
			error: error.message,
		});
	}
}

module.exports = {
	generateShortUrl,
	generateOriginalUrl,
};
