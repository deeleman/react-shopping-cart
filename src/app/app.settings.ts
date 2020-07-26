import { PricingRules } from './types';

// Main settings - edit endpoints below at your convenience
const items         = '/api/fixtures/product-items.json';
const discountRules = '/api/fixtures/product-discounts.json';

// Do not edit anything below this line
export const httpSettings: Record<keyof PricingRules, string> = { items, discountRules };
