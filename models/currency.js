const mongoose = require('mongoose');
const Float = require('mongoose-float').loadType(mongoose, 4);

const currencySchema = new mongoose.Schema({
  currency_name: { type: String, required: [true, 'NO_CURRENCY_NAME'], uppercase: true },
  currency_code: {
    type: String, require: [true, 'NO_CURRENCY_CODE'], uppercase: true, unique: [true, 'CURRENCY_CODE_EXISTS'],
  },
  usd_rate: { type: Float, require: [true, 'NO_USD_RATE'] },
});

module.exports = mongoose.model('Currency', currencySchema);
