import { Item } from './api';

export interface CartItem extends Item {
  quantity: number;
  shortName: string;
}
