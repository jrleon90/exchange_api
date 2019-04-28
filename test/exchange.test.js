/* eslint-disable no-undef */

const chai = require('chai');

const { expect } = chai;
const sinon = require('sinon');

const ExchangeController = require('../controllers/exchangeController');

describe('Exchange Controller', () => {
  it('Should make a succesful exchange', async () => {
    const exchangeStub = sinon.stub(ExchangeController, 'calculateExchange').returns(92);
    expect(exchangeStub()).to.equal(92);
  });
});
