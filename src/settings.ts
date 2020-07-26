import { PricingSettings } from './app';

// Main settings - edit endpoints below at your convenience to point to an REST API of tyour choice
const items         = 'http://localhost:8888/api/fixtures/product-items.json';
const discountRules = 'http://localhost:8888/api/fixtures/product-discounts.json';

// Do not edit anything below this line
export const settings: PricingSettings = { items, discountRules };
