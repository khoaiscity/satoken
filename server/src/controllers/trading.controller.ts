import {inject} from '@loopback/core';
import {RestBindings, get, post, requestBody, Request, param} from '@loopback/rest';
import {TradingService} from '../services';

import {Trading} from '../models';

import {authCode} from '../config.json';

export class TradingController {
  constructor(
    @inject('services.TradingService')
    protected tradingService: TradingService,
    @inject(RestBindings.Http.REQUEST) public request: Request,
  ) {}

  @get('api/trade/history')
  async tradeHistory(
    @param.query.string('page') page: number,
    @param.query.string('limit') limit: number,
    @param.query.string('market') market: string,
    @requestBody() body: object,
  ) {

    const payload = {
      page: page,
      limit: limit,
      market: market
    };
    const res = await this.tradingService.getTradingHistory(payload,
      authCode,
    );
    return res;
  }

  @get('api/order/history')
  async orderHistory(
    @param.query.string('page') page: number,
    @param.query.string('limit') limit: number,
    @param.query.string('market') market: string,
    @param.query.string('date_from') date_from: string,
    @param.query.string('date_to') date_to: string,
    @requestBody() body: object,
  ) {

    const payload = {
      page: page,
      limit: limit,
      market: market
    };

    if (date_from) {
      Object.assign(payload, {date_from: date_from})
    }

    if (date_to) {
      Object.assign(payload, {date_to: date_to})
    }

    const token = this.request.headers["token"] as string;
    const res = await this.tradingService.getOrderHistory(payload,
      authCode, token
    );
    return res;
  }

  @post('api/order/limit/buy')
  async orderLimitBuy(
    @requestBody() body: Trading,
  ) {

    const payload = {
      market: body.market,
      quantity: body.quantity,
      price: body.price
    };

    const token = this.request.headers["token"] as string;
    const res = await this.tradingService.orderLimitBuy(payload,
      authCode, token
    );
    return res;
  }

  @post('api/order/limit/sell')
  async orderLimitSell(
    @requestBody() body: Trading,
  ) {

    const payload = {
      market: body.market,
      quantity: body.quantity,
      price: body.price
    };

    const token = this.request.headers["token"] as string;
    const res = await this.tradingService.orderLimitSell(payload,
      authCode, token
    );
    return res;
  }

  @post('api/order/market/buy')
  async orderMarketBuy(
    @requestBody() body: Trading,
  ) {

    const payload = {
      market: body.market,
      quantity: body.quantity
    };

    const token = this.request.headers["token"] as string;
    const res = await this.tradingService.orderMarketBuy(payload,
      authCode, token
    );
    return res;
  }

  @post('api/order/market/sell')
  async orderMarketSell(
    @requestBody() body: Trading,
  ) {

    const payload = {
      market: body.market,
      quantity: body.quantity
    };

    const token = this.request.headers["token"] as string;
    const res = await this.tradingService.orderMarketSell(payload,
      authCode, token
    );
    return res;
  }

  @get('api/trading-view')
  async tradingView(
    @param.query.string('market') market: string,
    @requestBody() body: Trading,
  ) {

    const payload = {
      market: market
    };
    const res = await this.tradingService.tradingView(payload,
      authCode
    );
    return res;
  }

  @get('api/price')
  async price(
    @param.query.string('market') market: string,
    @requestBody() body: Trading,
  ) {

    const payload = {
      market: market
    };
    const res = await this.tradingService.price(payload,
      authCode
    );
    return res;
  }

  @get('api/market/detail')
  async marketDetail(
    @param.query.string('market') market: string,
    @requestBody() body: Trading,
  ) {

    const payload = {
      market: market
    };
    const res = await this.tradingService.marketDetail(payload,
      authCode
    );
    return res;
  }
}
