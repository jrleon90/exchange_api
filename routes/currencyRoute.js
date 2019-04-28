const CurrencyController = require('../controllers/currencyController');

module.exports = (app) => {
  app.post('/currency/create', CurrencyController.addCurrency);
};
