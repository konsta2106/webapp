const express = require('express');
const cors = require('cors');
const fuelRoutes = require('./routes/fuelRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/fuel-prices', fuelRoutes);

module.exports = app;