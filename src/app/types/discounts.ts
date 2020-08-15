import { ItemCode, DiscountRule, DiscountType } from './api';

export interface PromoCodeDiscountRule extends DiscountRule {
  code: string;
}

export interface DiscountItem {
  type: DiscountType;
  itemCode: ItemCode;
  name: string;
  subTotal: number;
}
