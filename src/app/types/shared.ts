import { Item } from './items';
import { DiscountRule } from './discounts';

export type PricingRules = {
  items: Item[];
  discountRules: Partial<DiscountRule>[];
}
