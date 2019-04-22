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
    // const res = await this.userService.login(user.username, user.password);
    const res = {data: {access_token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJQcjBERXl4THBZNExPTXlFZ2FKT0xieDJTT1lwMWtRdCIsImp0aSI6IjYzMGNhNTExZDAzZjFmMzJkYzhjNjk0OGU3OTFlYmM4MmQ4N2Q0MDAwMTczYzlmOWM4ZmQ4NzRlYmMzNTNjMzEzMzhjMWJlZjAwYjU2NmI2IiwiaWF0IjoxNTU1OTAxMzk2LCJuYmYiOjE1NTU5MDEzOTYsImV4cCI6MTU1NTkwODU5Niwic3ViIjoiQ0JYLUtUZTVvay1Nc2hxaWotdDdXa1B3LU96OVZzZSIsInNjb3BlcyI6W10sImRhdGEiOnsiZW1haWwiOiJjaGl0cnVuZzQ0QGdtYWlsLmNvbSIsIm5hbWUiOiJ0cnVuZzEyMzQ1NiIsInBob25lIjpudWxsfX0.DK169NgqQCMLPn9IlzoSN-lRk8cX9BhSZvTAjjTYZSVKPIyP83nj3aZPdeNtamum8Zq8aSxEOS2dPNgmBm-MrByfDMsVFQaGEEbOc46yGm8wpiNS30dnpAVbVaRhqCujoi3av43MsP8_Ze_XK6j6C57jHpAjeT5rulZ4eaf5au4F8zzVLkcIyZ40BPL5RZysH2WQu1rUDsZtOOdKhN-3SsgW3c2mbqEE68IZ2ROHuvPz5hqh_q6xMmGI_T06J4xculylxNqXCUx6lTKcXBeIfuE6mkShKmVkX6xkS2rQuA1F8uIB-40NL9T1ptY0UWx8EVl_A8V2EaZdEuK5JgVIk5jsqEY5CQsSSKJfaZ7xpMfasl2KPGTrXTBfnCef2IDLY050kjeYNQFXHS5wVrYHllokdMQ2OAz0IlD-vwwDYOI-pqNeCmWR5OpiBHDEvPiowhOja99EMZiNu9vd-kkZ5_lU03fLBJrkQsCS8txVvlwJK6HnW3OyVUoPlsVq-U_FiVPUpo2sXlGSYp4SdYWNjLJyuWDEIQUnK3ninHDOrAv_TDxidnPaaw6Vi242li1vatgsvxTj33nq9oAxyT67_jkUHolYfIGMcxr_VAfYMhqO06ZCHM_56zgBLRX-XZ-oBDNnkw2H0Moj3bnvNqScEhhn5ZldGSrDH25ilb5EQI4"}}
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
