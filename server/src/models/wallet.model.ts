import {Entity, model} from '@loopback/repository';

@model()
export class Wallet extends Entity {
  market: string;
  quantity: number;
}
