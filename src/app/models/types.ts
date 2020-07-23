export enum ItemCode {
  TShirt  = 'TSHIRT',
  Mug     = 'MUG',
  Cap     = 'CAP'
}

export interface Item {
  id: string;
  code: ItemCode;
  name: string;
  price: number;
}

export interface CartItem extends Item {
  quantity: number;
}

export type PricingRules = {
  items: Item[];
}

export interface ItemScanner {
  scan: (itemCode: ItemCode, quantity?: number) => ItemScanner;
}
