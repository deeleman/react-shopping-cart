import { DiscountRule, DiscountType } from './api';

export interface PromoCodeDiscountRule extends DiscountRule {
  code: string;
}

export interface DiscountItem {
  type: DiscountType;
  name: string;
  subTotal: number;
}
