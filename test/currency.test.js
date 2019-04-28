/* eslint-disable no-undef */

const chai = require('chai');

const { expect } = chai;
const sinon = require('sinon');

const CurrencyController = require('../controllers/currencyController');

describe('Currency Controller', () => {
  it('Should create a new currency', () => {
    const currencyStub = sinon.stub(CurrencyController, 'addCurrency').returns({
      currency_name: 'US DOLLAR',
      currency_code: 'USD',
      usd_rate: 1,
    });
    expect(currencyStub().currency_name).to.equal('US DOLLAR');
    expect(currencyStub().currency_code).to.equal('USD');
    expect(currencyStub().usd_rate).to.equal(1);
  });
});
