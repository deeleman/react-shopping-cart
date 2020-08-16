import { Item, DiscountRule, CartItem, DiscountItem } from 'shopping-cart/types';

export interface CartState {
  items: Item[];
  discountRules: DiscountRule[];
  cartItems: CartItem[];
  discountItems: DiscountItem[];
  isLoading: boolean;
  lastError?: string;
}

