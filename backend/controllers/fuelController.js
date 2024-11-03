const axios = require('axios');

const host = process.env.HOST;
const fuelApiCode = process.env.FUEL_API_CODE;

const getFuelPrices = async (req, res) => {
  try {
    console.log('Fetching fuel prices...');
    const response = await axios.get(`${host}/api/httpTriggerGetFuelPrices?code=${fuelApiCode}`);
    res.json({ data: response.data });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Failed to fetch fuel prices' });
  }
};

module.exports = { getFuelPrices };