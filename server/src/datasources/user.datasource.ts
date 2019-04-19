import {inject} from '@loopback/core';
import {juggler} from '@loopback/repository';
import {RequestConfig} from './_requestConfig';
import {RequestTempalte} from './_requestTemplate';

import {userApiUrl} from '../config.json';

let resquest = new RequestConfig();

let reqT = new RequestTempalte();

const loginT = reqT.post(
  `${userApiUrl}/api/signIn`,
  {
    password: '{password}',
    grant_type: 'password',
    username: '{username}',
  },
  {
    login: ['username', 'password'],
  },
);

const signUpT = reqT.post(`${userApiUrl}/api/signUp`, '{payload}', {
  signUp: ['payload'],
});

const config = resquest.secretRequest([loginT, signUpT]);

export class UserDataSource extends juggler.DataSource {
  static dataSourceName = 'user';

  constructor(
    @inject('datasources.config.user', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
