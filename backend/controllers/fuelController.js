const axios = require('axios');

const host = process.env.HOST;
const fuelApiCode = process.env.FUEL_API_CODE;

const getFuelPrices = async (req, res) => {
  try {
    console.log('Fetching fuel prices...');
    const response = await axios.get(`${host}/api/httpTriggerGetFuelPrices?code=${fuelApiCode}`);
    if (response.data) {
      console.log('fuel prices fetched')
    }
    res.json({ data: response.data });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Failed to fetch fuel prices' });
  }
};

const getLatestFuelPrices = async (req, res) => {
  try {
    console.log('Fetching latest fuel prices...');
    const response = await axios.get(`${host}/api/httpTriggerGetLatestFuelPrices?code=${fuelApiCode}`);
    if (response.data) {
      console.log('latest fuel prices fetched')
    }
    res.json({ data: response.data });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Failed to fetch fuel prices' });
  }
};

module.exports = { getFuelPrices, getLatestFuelPrices };