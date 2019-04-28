const CurrencyController = require('../controllers/currencyController');
const { decodeToken } = require('../middlewares/jwt');

module.exports = (app) => {
  app.post('/currency/create', decodeToken, CurrencyController.addCurrency);
};
