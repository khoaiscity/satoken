import {inject} from '@loopback/core';
import {juggler} from '@loopback/repository';
import {RequestConfig} from './_requestConfig';
import {RequestTempalte} from './_requestTemplate';

const walletApiUrl = 'http://172.104.54.206/walletapiv3/public';

let resquest = new RequestConfig();

let reqT = new RequestTempalte();

const wallets = reqT.get(
  `${walletApiUrl}/api/wallets`,
  '{payload}',
  {
    getWallets: ['payload', 'auth', 'token'],
  },
);
wallets.showAuth = true;
wallets.showToken = true;

const walletBalance = reqT.get(
  `${walletApiUrl}/api/wallet/balance`,
  '{payload}',
  {
    getWalletBalance: ['payload', 'auth', 'token'],
  },
);
walletBalance.showAuth = true;
walletBalance.showToken = true;

const statementList = reqT.get(
  `${walletApiUrl}/api/statement/list`,
  '{payload}',
  {
    statementList: ['payload', 'auth', 'token'],
  },
);
statementList.showAuth = true;
statementList.showToken = true;

const config = resquest.secretRequest([wallets, walletBalance, statementList]);

export class WalletDataSource extends juggler.DataSource {
  static dataSourceName = 'wallet';

  constructor(
    @inject('datasources.config.wallet', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
