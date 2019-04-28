const Currency = require('../models/currency');

const addCurrency = async (req, res) => {
  try {
    if (!req.body.currency_name || !req.body.currency_code || !req.body.usd_rate) { return res.status(403).json({ Message: 'Incomplete data' }); }
    const currency = new Currency({
      currency_name: req.body.currency_name,
      currency_code: req.body.currency_code,
      usd_rate: req.body.usd_rate,
    });
    await Currency.create(currency);
    return res.json({
      Message: 'Success',
      currency,
    });
  } catch (err) {
    return res.status(500).json({ Error: err });
  }
};

module.exports = {
  addCurrency,
};
