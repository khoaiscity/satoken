import {getService, juggler} from '@loopback/service-proxy';
import {inject, Provider} from '@loopback/core';
import {TradingDataSource} from '../datasources/trading.datasource';

export interface TradingService {
  getTradingHistory(payload: object, auth: string): Promise<object>;
  getOrderHistory(payload: object, auth: string, token: string): Promise<object>;
  orderLimitBuy(payload: object, auth: string, token: string): Promise<object>;
  orderLimitSell(payload: object, auth: string, token: string): Promise<object>;
  orderMarketBuy(payload: object, auth: string, token: string): Promise<object>;
  orderMarketSell(payload: object, auth: string, token: string): Promise<object>;
  tradingView(payload: object, auth: string): Promise<object>;
  price(payload: object, auth: string): Promise<object>;
  marketDetail(payload: object, auth: string): Promise<object>;
}

export class TradingServiceProvider implements Provider<TradingService> {
  constructor(
    @inject('datasources.trading')
    protected dataSource: juggler.DataSource = new TradingDataSource(),
  ) {}

  value(): Promise<TradingService> {
    return getService(this.dataSource);
  }
}