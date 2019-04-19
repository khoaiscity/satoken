import {getService, juggler} from '@loopback/service-proxy';
import {inject, Provider} from '@loopback/core';
import {MarketDataSource} from '../datasources/market.datasource';

export interface MarketService {
  getMarketList(payload: object, auth: string): Promise<object>;
}

export class MarketServiceProvider implements Provider<MarketService> {
  constructor(
    @inject('datasources.market')
    protected dataSource: juggler.DataSource = new MarketDataSource(),
  ) {}

  value(): Promise<MarketService> {
    return getService(this.dataSource);
  }
}