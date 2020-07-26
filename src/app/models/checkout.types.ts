import { ItemCode } from '@shopping-cart/types';

export interface CheckoutScanner {
  scan: (itemCode: ItemCode, quantity?: number) => CheckoutScanner;
}

export interface CheckoutTotal {
  total: () => number;
}
