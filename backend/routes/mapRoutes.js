const express = require('express');
const map = require('../controllers/mapController');
const router = express.Router();

router.get('/health', map.health);
router.get('/autocomplete', map.autocomplete);
router.get('/geocode', map.geocode);
router.get('/reverse', map.reverse);

module.exports = router;
