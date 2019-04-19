import {property, Entity, model} from '@loopback/repository';

@model()
export class User extends Entity {
  name: string;

  @property()
  email: string;
  
  c_password: string;
  grant_type: string;
  client_id: string;
  secret: string;
  redirect_url: string;
  scope: string;

  @property()
  username: string;

  @property()
  password: string;
}

