import {Entity, model} from '@loopback/repository';

@model()
export class Trading extends Entity {
  market: string;
  quantity: number;
  price: number;
}

