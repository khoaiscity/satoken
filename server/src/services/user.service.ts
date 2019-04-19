import {getService, juggler} from '@loopback/service-proxy';
import {inject, Provider} from '@loopback/core';
import {UserDataSource} from '../datasources/user.datasource';

export interface UserService {
  login(username: string, password: string): Promise<object>;
  signUp(payload: object): Promise<object>;
}

export class UserServiceProvider implements Provider<UserService> {
  constructor(
    @inject('datasources.user')
    protected dataSource: juggler.DataSource = new UserDataSource(),
  ) {}

  value(): Promise<UserService> {
    return getService(this.dataSource);
  }
}