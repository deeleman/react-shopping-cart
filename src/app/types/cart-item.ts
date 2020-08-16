import { Item, CartId } from './api';

export interface CartItem  extends CartId {
  quantity: number;
}

export type CatalogueItem = Item & CartItem;
