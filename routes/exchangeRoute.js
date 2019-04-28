const ExchangeController = require('../controllers/exchangeController');

module.exports = (app) => {
  app.post('/exchange', ExchangeController.calculateExchange);
};
