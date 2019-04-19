import {inject} from '@loopback/core';
import {RestBindings, get, requestBody, Request, param} from '@loopback/rest';
import {WalletService} from '../services';

import {Wallet} from '../models';

import {authCode} from '../config.json';

export class WalletController {
  constructor(
    @inject('services.WalletService')
    protected walletService: WalletService,
    @inject(RestBindings.Http.REQUEST) public request: Request,
  ) {}

  @get('api/wallets')
  async wallets(
    @param.query.string('page') page: number,
    @param.query.string('limit') limit: number,
    @param.query.string('transaction_date') transaction_date: string,
    @param.query.string('search') search: string,
    @param.query.string('order') order: string,
    @param.query.string('wallet_type') wallet_type: string,
    @param.query.string('effective_date') effective_date: string,
    @requestBody() body: Wallet,
  ) {
    const payload = {
      page: page,
      limit: limit,
    };

    if (transaction_date) {
      Object.assign(payload, {transaction_date: transaction_date});
    }
    if (search) {
      Object.assign(payload, {search: search});
    }
    if (order) {
      Object.assign(payload, {order: order});
    }
    if (wallet_type) {
      Object.assign(payload, {wallet_type: wallet_type});
    }
    if (effective_date) {
      Object.assign(payload, {effective_date: effective_date});
    }

    const token = this.request.headers['token'] as string;
    const res = await this.walletService.getWallets(payload, authCode, token);
    return res;
  }

  @get('api/wallet/balance')
  async walletBalance(
    @param.query.string('wallet_type') wallet_type: string,
    @param.query.string('effective_date') effective_date: string,
    @param.query.string('transaction_date') transaction_date: string,
    @requestBody() body: Wallet,
  ) {
    const payload = {
      wallet_type: wallet_type,
      transaction_date: transaction_date,
    };

    if (effective_date) {
      Object.assign(payload, {effective_date: effective_date});
    }

    console.log(payload);

    const token = this.request.headers['token'] as string;
    const res = await this.walletService.getWalletBalance(
      payload,
      authCode,
      token,
    );
    return res;
  }

  @get('api/statement/list')
  async statementList(
    @param.query.string('page') page: number,
    @param.query.string('limit') limit: number,
    @param.query.string('transaction_type') transaction_type: string,
    @param.query.string('search') search: string,
    @param.query.string('order') order: string,
    @param.query.string('wallet_id') wallet_id: string,
    @param.query.string('wallet_type') wallet_type: string,
    @param.query.string('date_from') date_from: string,
    @param.query.string('date_to') date_to: string,
    @requestBody() body: Wallet,
  ) {
    const payload = {
      page: page,
      limit: limit,
    };

    if (transaction_type) {
      Object.assign(payload, {transaction_type: transaction_type});
    }
    if (search) {
      Object.assign(payload, {search: search});
    }
    if (order) {
      Object.assign(payload, {order: order});
    }
    if (wallet_type) {
      Object.assign(payload, {wallet_type: wallet_type});
    }
    if (wallet_id) {
      Object.assign(payload, {wallet_id: wallet_id});
    }

    if (date_from) {
      Object.assign(payload, {date_from: date_from});
    }

    if (date_to) {
      Object.assign(payload, {date_to: date_to});
    }

    const token = this.request.headers['token'] as string;
    const res = await this.walletService.statementList(
      payload,
      authCode,
      token,
    );
    return res;
  }
}
