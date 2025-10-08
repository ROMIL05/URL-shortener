const express = require('express');
const router = express.Router();
const urlController = require('../controllers/url.controller');
const { asyncRouteHandler } = require('../utils/route.utils');

router.post('/shorten', asyncRouteHandler(urlController.generateShortUrl));

module.exports = router;
