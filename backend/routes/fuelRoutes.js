const express = require('express');
const { getFuelPrices } = require('../controllers/fuelController');

const router = express.Router();
router.get('/', getFuelPrices);

module.exports = router;