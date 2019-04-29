const axios = require('axios');
const Currency = require('../models/currency');

const updateExchangeRates = async () => {
  try {
    process.stdout.write('Updating rates\n');
    const rates = await axios.get('https://api.exchangeratesapi.io/latest?base=USD');
    const ratesArr = Object.entries(rates.data.rates);
    ratesArr.map(async (element) => {
      const currency = await Currency.findOne({ currency_code: element[0] });
      if (currency !== null) {
        process.stdout.write(`Updating ${currency.currency_code}\n`);
        Currency.updateOne({ currency_code: element[0] }, { $set: { usd_rate: element[1] } });
      }
    });
    return true;
  } catch (err) {
    return err;
  }
};

module.exports = {
  updateExchangeRates,
};
