import { createAsyncThunk, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CatalogueItem, DiscountItem, DiscountRule, Item, PricingRules, PricingSettings } from 'shopping-cart/types';
import { dataService, getDiscountItems } from '../services';
import { CartState } from './types';

const initialState: CartState = {
  items: [],
  discountRules: [],
  cartItems: [],
  discountItems: [],
  isLoading: true,
  lastError: undefined,
};

// Exported Thunks
export const fetchItems = createAsyncThunk(
  'cart/fetchItems',
  async (settings: PricingSettings) => await dataService<PricingRules>(settings),
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    add: (state: CartState, action: PayloadAction<{ id: string; quantity?: number }>) => {
      const cartItem = state.cartItems.find((item) => item.id === action.payload.id);
      if (cartItem) {
        cartItem.quantity = action.payload.quantity !== undefined ? 
          action.payload.quantity : 
          cartItem.quantity + 1;
      } else {
        state.cartItems.push({ id: action.payload.id, quantity: 1 });
      }
    },
    remove: (state: CartState, action: PayloadAction<string>) => {
      const cartItem = state.cartItems.find((item) => item.id === action.payload);
      if (cartItem && cartItem.quantity > 0) {
        cartItem.quantity =  cartItem.quantity - 1; 
      }
    }
  },
  extraReducers: {
    [fetchItems.pending.type]: (state: CartState) => {
      state.isLoading = true;
    },
    [fetchItems.fulfilled.type]: (state: CartState, action: PayloadAction<PricingRules>) => {
      state.items = action.payload.items.map((item) => ({ 
        ...item,
        shortName: item.code.charAt(0).toUpperCase() + item.code.slice(1).toLowerCase(),
      }));
      state.discountRules = action.payload.discountRules;
      state.isLoading = false;
    },
    [fetchItems.rejected.type]: (state: CartState, action: { error: Error }) => {
      state.lastError = action.error.message;
      state.isLoading = false;
    }
  }
});

// Exported Actions
export const { add, remove } = cartSlice.actions;

// Exported Selectors
export const selectIsLoading = (state: CartState): boolean => state.isLoading;
export const selectHasError = (state: CartState): boolean => Boolean(state.lastError);
export const selectCartItems = (state: CartState): CatalogueItem[] => {
  return state.items.map((item: Item) => {
    const catalogueItem = state.cartItems.find((cartItem) => cartItem.id === item.id);
    const quantity = catalogueItem ? catalogueItem.quantity : 0;

    return { ...item, quantity } as CatalogueItem;
  });
};
export const selectDiscountRules = (state: CartState): DiscountRule[] => state.discountRules;
export const selectDiscountItems = createSelector(
  selectCartItems,
  selectDiscountRules,
  (cartItems: CatalogueItem[], discountRules: DiscountRule[]) => getDiscountItems(cartItems, discountRules),
);
export const selectCartItemsAmount = (state: CartState): number => {
  return state.cartItems.reduce((quantity, cartItem) => quantity + cartItem.quantity, 0);
};
export const selectCartSubtotal = createSelector(
  selectCartItems,
  (cartItems) => cartItems.reduce((subTotal, cartItem) => subTotal + (cartItem.quantity * cartItem.price), 0)
);
export const selectCartTotal = createSelector(
  selectDiscountItems,
  selectCartSubtotal,
  (discountItems: DiscountItem[], subTotal: number) => 
    discountItems.reduce((total, discountItem) => total - discountItem.subTotal, subTotal),
);

// Exported Reducer
export default cartSlice.reducer;
