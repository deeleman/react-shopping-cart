/**
 * @deprecated
 */
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

export enum DiscountType {
  '2x1'     = '2x1',
  Bulk      = 'bulk',
  PromoCode = 'promoCode',
  Other     = 'other',
}

export interface DiscountRule {
  type: DiscountType;
  eligibleItems: ItemCode[];
  minimumItems: number;
  discount?: number;
}
