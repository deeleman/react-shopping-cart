import { Item, DiscountRule } from './api';

export type PricingRules = {
  items: Item[];
  discountRules: Partial<DiscountRule>[];
}

export type PricingSettings = Record<keyof PricingRules, string>;
