import {inject} from '@loopback/core';
import {juggler} from '@loopback/repository';
import {RequestConfig} from './_requestConfig';
import {RequestTempalte} from './_requestTemplate';

const tradingApiUrl = 'http://172.104.54.206/tradingapi/public';

let resquest = new RequestConfig();

let reqT = new RequestTempalte();

const tradingHistory = reqT.get(
  `${tradingApiUrl}/api/trade/history`,
  '{payload}',
  {
    getTradingHistory: ['payload', 'auth'],
  },
);
tradingHistory.showAuth = true;

const orderHistory = reqT.get(
  `${tradingApiUrl}/api/order/history`,
  '{payload}',
  {
    getOrderHistory: ['payload', 'auth', 'token'],
  },
);
orderHistory.showAuth = true;
orderHistory.showToken = true;

const orderLimitBuy = reqT.post(
  `${tradingApiUrl}/api/order/limit/buy`,
  '{payload}',
  {
    orderLimitBuy: ['payload', 'auth', 'token'],
  },
);
orderLimitBuy.showAuth = true;
orderLimitBuy.showToken = true;

const orderLimitSell = reqT.post(
  `${tradingApiUrl}/api/order/limit/sell`,
  '{payload}',
  {
    orderLimitSell: ['payload', 'auth', 'token'],
  },
);
orderLimitSell.showAuth = true;
orderLimitSell.showToken = true;


const orderMarketBuy = reqT.post(
  `${tradingApiUrl}/api/order/market/buy`,
  '{payload}',
  {
    orderMarketBuy: ['payload', 'auth', 'token'],
  },
);
orderMarketBuy.showAuth = true;
orderMarketBuy.showToken = true;

const orderMarketSell = reqT.post(
  `${tradingApiUrl}/api/order/market/sell`,
  '{payload}',
  {
    orderMarketSell: ['payload', 'auth', 'token'],
  },
);
orderMarketSell.showAuth = true;
orderMarketSell.showToken = true;

const tradingView = reqT.get(
  `${tradingApiUrl}/api/v1/trading-view`,
  '{payload}',
  {
    tradingView: ['payload', 'auth'],
  },
);
tradingView.showAuth = true;

const price = reqT.get(
  `${tradingApiUrl}/api/price`,
  '{payload}',
  {
    price: ['payload', 'auth'],
  },
);
price.showAuth = true;

const marketDetail = reqT.get(
  `${tradingApiUrl}/api/v1/market/detail`,
  '{payload}',
  {
    marketDetail: ['payload', 'auth'],
  },
);
marketDetail.showAuth = true;

const config = resquest.secretRequest([tradingHistory, orderHistory, orderLimitBuy, orderLimitSell, orderMarketBuy, orderMarketSell, tradingView, price, marketDetail]);

export class TradingDataSource extends juggler.DataSource {
  static dataSourceName = 'trading';

  constructor(
    @inject('datasources.config.trading', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
