import { ItemCode } from './items';

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

export interface PromoCodeDiscountRule extends DiscountRule {
  code: string;
}

export interface DiscountItem {
  type: DiscountType;
  itemCode: ItemCode;
  name: string;
  subTotal: number;
}
