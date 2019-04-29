require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { updateExchangeRates } = require('./helpers/updateRates');

const PORT = process.env.PORT || 3600;

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true });

const app = express();

app.use(express.json());

// Load Routes
require('./routes/userRoute')(app);
require('./routes/exchangeRoute')(app);
require('./routes/currencyRoute')(app);

// Update rates and set an interval to update rates every 5 min
updateExchangeRates();
setInterval(() => updateExchangeRates(), process.env.UPDATE_TIMER);

// Start Application
app.listen(PORT, () => {
  process.stdout.write(`API Listening on Port ${PORT}\n`);
});
