export enum ItemCode {
  TShirt  = 'SHIRT',
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
  shortName: string;
}
