import { Item } from './items';
import { DiscountRule } from './discounts';

export type PricingRules = {
  items: Item[];
  discountRules: Partial<DiscountRule>[];
}

export type PricingSettings = Record<keyof PricingRules, string>;
