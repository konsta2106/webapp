const express = require('express');
const { getFuelPrices, getLatestFuelPrices } = require('../controllers/fuelController');

const router = express.Router();
router.get('/', getFuelPrices);
router.get('/latest', getLatestFuelPrices);

module.exports = router;