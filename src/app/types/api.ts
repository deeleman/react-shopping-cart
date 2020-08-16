export interface CartId {
  id: string;
}

export interface Item extends CartId {
  name: string;
  price: number;
}

export enum DiscountType {
  '2x1'     = '2x1',
  Bulk      = 'bulk',
  PromoCode = 'promoCode',
  Other     = 'other',
}

export interface DiscountRule {
  type: DiscountType;
  eligibleItems: string[];
  minimumItems: number;
  discount?: number;
}
