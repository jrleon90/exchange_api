require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3600;

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true });

const app = express();

app.use(express.json());

require('./routes/userRoute')(app);
require('./routes/exchangeRoute')(app);
require('./routes/currencyRoute')(app);

app.listen(PORT, () => {
  process.stdout.write(`API Listening on Port ${PORT}\n`);
});
