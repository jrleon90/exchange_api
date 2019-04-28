const Currency = require('../models/currency');

const calculateExchange = async (req, res) => {
  try {
    const { from, to, total } = req.query;
    const fromCurrency = await Currency.findOne({ currency_code: from });
    let toCurrency = {};
    if (fromCurrency.currency_code === 'USD') {
      toCurrency = await Currency.aggregate([{ $match: { currency_code: to } },
        {
          $project: {
            exchange: { $multiply: [parseFloat(total), '$usd_rate'] },
          },
        }]);
    } else if (to === 'USD') {
      toCurrency = await Currency.aggregate([{ $match: { currency_code: to } },
        {
          $project: {
            exchange: { $divide: [parseFloat(total), fromCurrency.usd_rate] },
          },
        }]);
    } else {
      const usdExchange = parseFloat(total) / fromCurrency.usd_rate;
      toCurrency = await Currency.aggregate([{ $match: { currency_code: to } },
        {
          $project: {
            exchange: { $multiply: [parseFloat(usdExchange), '$usd_rate'] },
          },
        }]);
    }
    return res.json({ value: toCurrency[0].exchange.toFixed(4) });
  } catch (err) {
    return res.status(500).json({ Error: err });
  }
};

module.exports = {
  calculateExchange,
};
