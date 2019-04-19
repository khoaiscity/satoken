import {inject} from '@loopback/core';
import {RestBindings, get, requestBody, Request, param} from '@loopback/rest';
import {MarketService} from '../services';
import {authCode} from '../config.json';

export class MarketController {
  constructor(
    //@repository(TodoRepository) protected todoRepo: TodoRepository,
    @inject('services.MarketService')
    protected marketService: MarketService,
    @inject(RestBindings.Http.REQUEST) public request: Request,
  ) {}

  @get('api/market')
  async market(
    @param.query.string('from') from: string,
    @param.query.string('to') to: string,
    @param.query.string('sort_name') sort_name: string,
    @param.query.string('sort_movement') sort_movement: string,
    @param.query.string('search') search: string,
    @requestBody() body: object,
  ) {
    const payload = {
      from: from,
      to: to,
      sort_name: sort_name,
      sort_movement: sort_movement,
      search: search,
    };
    const res = await this.marketService.getMarketList(payload, authCode);
    return res;
  }
}
