import {inject} from '@loopback/core';
import {ResponseObject, post, requestBody, HttpErrors} from '@loopback/rest';
import {UserService} from '../services';
import {User} from '../models';

import {clientId, secret} from '../config.json';

/**
 * OpenAPI response for ping()
 */
const PING_RESPONSE: ResponseObject = {
  description: 'Ping Response',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          greeting: {type: 'string'},
          date: {type: 'string'},
          url: {type: 'string'},
          headers: {
            type: 'object',
            properties: {
              'Content-Type': {type: 'string'},
            },
            additionalProperties: true,
          },
        },
      },
    },
  },
};


export class UserController {
  constructor(
    //@repository(TodoRepository) protected todoRepo: TodoRepository,
    @inject('services.UserService') protected userService: UserService,
  ) {}

  @post('api/login', {
    responses: {
      '200': PING_RESPONSE,
    },
  })
  async login(@requestBody() user: User) {
    if (!user.username) {
      throw new HttpErrors.BadRequest('User name is required');
    }

    if (!user.password) {
      throw new HttpErrors.BadRequest('Password is required');
    }
    const res = await this.userService.login(user.username, user.password);
    return res;
  }

  @post('api/sign-up')
  async signUp(@requestBody() user: User) {
    // if (!user.username) {
    //   throw new HttpErrors.BadRequest('User name is required');
    // }

    console.log(user)

    const payload = {
      name: user.email,
      email: user.email,
      password: user.password,
      c_password: user.c_password,
      grant_type: 'password',
      client_id: clientId,
      secret: secret,
      redirect_url: user.redirect_url,
      scope: '',
      username: user.email,
    };

    // if (!user.password) {
    //   throw new HttpErrors.BadRequest('Password is required');
    // }
    const res = await this.userService.signUp(payload);
    return res;
  }
}
