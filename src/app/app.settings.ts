import { PricingSettings } from './types';

// Main settings - edit endpoints below at your convenience
const items         = 'http://localhost:8888/api/fixtures/product-items.json';
const discountRules = 'http://localhost:8888/api/fixtures/product-discounts.json';

// Do not edit anything below this line
export const httpSettings: PricingSettings = { items, discountRules };
