const express = require('express');
const router = express.Router();
const urlController = require('../controllers/url.controller');
const { asyncRouteHandler } = require('../utils/route.utils');

router.post('/generate-shorten', asyncRouteHandler(urlController.generateShortUrl));
router.post('/generate-original', asyncRouteHandler(urlController.generateOriginalUrl));

module.exports = router;
