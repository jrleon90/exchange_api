const cache = require('memory-cache');
const Currency = require('../models/currency');

const calculateExchange = async (req, res) => {
  try {
    const { from, to, total } = req.query;
    const fromCurrency = await Currency.findOne({ currency_code: from });
    const toCurrency = await Currency.findOne({ currency_code: to });
    let exchangeVal = 0;
    if (fromCurrency.currency_code === 'USD') {
      exchangeVal = parseFloat(total) * toCurrency.usd_rate;
    } else if (to === 'USD') {
      exchangeVal = parseFloat(total) / fromCurrency.usd_rate;
    } else {
      const usdExchange = parseFloat(total) / fromCurrency.usd_rate;
      exchangeVal = parseFloat(usdExchange) * toCurrency.usd_rate;
    }
    cache.put(req.decoded.email,
      { exchange: exchangeVal.toFixed(4) }, 60000);
    return res.json({ value: exchangeVal.toFixed(4) });
  } catch (err) {
    return res.status(500).json({ Error: 'There was an error' });
  }
};

const getCacheExchangeVal = async (req, res) => {
  try {
    const cacheVal = cache.get(req.decoded.email);
    if (cacheVal !== null) {
      return res.json(cacheVal);
    }
    return res.status(404).json({ Message: 'No Cache found' });
  } catch (err) {
    return res.status(500).json({ Error: err });
  }
};

module.exports = {
  calculateExchange,
  getCacheExchangeVal,
};
