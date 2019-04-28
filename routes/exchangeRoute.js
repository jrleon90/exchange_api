const ExchangeController = require('../controllers/exchangeController');
const { decodeToken } = require('../middlewares/jwt');

module.exports = (app) => {
  app.post('/exchange', decodeToken, ExchangeController.calculateExchange);
  app.get('/exchange/cache', decodeToken, ExchangeController.getCacheExchangeVal);
};
