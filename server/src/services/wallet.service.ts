import {getService, juggler} from '@loopback/service-proxy';
import {inject, Provider} from '@loopback/core';
import {WalletDataSource} from '../datasources/wallet.datasource';

export interface WalletService {
  getWallets(payload: object, auth: string, token: string): Promise<object>;
  getWalletBalance(payload: object, auth: string, token: string): Promise<object>;
  statementList(payload: object, auth: string, token: string): Promise<object>;
}

export class WalletServiceProvider implements Provider<WalletService> {
  constructor(
    @inject('datasources.wallet')
    protected dataSource: juggler.DataSource = new WalletDataSource(),
  ) {}

  value(): Promise<WalletService> {
    return getService(this.dataSource);
  }
}