import {inject} from '@loopback/core';
import {juggler} from '@loopback/repository';
import {RequestConfig} from './_requestConfig';
import {RequestTempalte} from './_requestTemplate';

const exInfoApiUrl = 'http://172.104.54.206/gcoxapiv2/public';


let resquest = new RequestConfig();

let reqT = new RequestTempalte();

const getMarket = reqT.get(`${exInfoApiUrl}/api/markets`, '{payload}', {
  getMarketList: ['payload', 'auth'],
});

getMarket.showAuth = true

const config = resquest.secretRequest([getMarket]);

export class MarketDataSource extends juggler.DataSource {
  static dataSourceName = 'market';

  constructor(
    @inject('datasources.config.market', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
