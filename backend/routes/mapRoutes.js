const express = require('express');
const { getRoute } = require('../controllers/mapController');

const router = express.Router();

// final URL = /routes/map  (because server mounts at /routes/map)
router.post('/', getRoute);

module.exports = router;
