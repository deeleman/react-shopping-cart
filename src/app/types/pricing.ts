import { Item, DiscountRule } from './api';

export type PricingRules = {
  items: Item[];
  discountRules: DiscountRule[];
}

export type PricingSettings = Record<keyof PricingRules, string>;
