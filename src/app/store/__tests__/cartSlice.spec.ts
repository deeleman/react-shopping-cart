import cartReducer, { add, fetchItems, remove } from '../cartSlice';
import { Item, DiscountRule, DiscountType } from '../../types';

describe('cartSlice', () => {
  describe('action creators', () => {
    it('should generate add action types', () => {
      const addAction = add({ id: 'X7R2OPX', quantity: 21 });
      expect(addAction).toEqual({
        type: 'cart/add',
        payload: { id: 'X7R2OPX', quantity: 21 },
      });
    });

    it('should generate remove action types', () => {
      const removeAction = remove('X7R2OPX');
      expect(removeAction).toEqual({
        type: 'cart/remove',
        payload: 'X7R2OPX',
      });
    });
  });

  describe('reducer', () => {
    const defaultStateMock = {
      items: [],
      discountRules: [],
      cartItems: [],
      discountItems: [],
      isLoading: true,
      lastError: undefined,
    };

    const itemsMock: Item[] = [
      { id: 'X7R2OPX', name: 'React T-Shirt', price: 20.00 },
      { id: 'X2G2OPZ', name: 'React Coffee Mug', price: 5.00 },
      { id: 'X3W2OPY', name: 'React Cap', price: 10.00 },
    ];
    
    const discountRulesMock: Partial<DiscountRule>[] = [
      { type: DiscountType['2x1'], eligibleItems: ['X2G2OPZ'] },
      { type: DiscountType.Bulk, eligibleItems: ['X7R2OPX'], discount: 0.05, minimumItems: 3 }
    ];

    const pricingRulesMock = {
      items: itemsMock,
      discountRules: discountRulesMock
    };
    
    it('should add elements to cart', () => {
      const addAction = add({ id: 'X7R2OPX' });
      const stateMock = {
        ...defaultStateMock,
        items: itemsMock,
        discountRules: discountRulesMock,
        isLoading: false,
      };

      let state = cartReducer(stateMock, addAction);
      expect(state.cartItems).toEqual([
        { id: 'X7R2OPX', quantity: 1 }
      ]);

      state = cartReducer(state, addAction);
      expect(state.cartItems).toEqual([
        { id: 'X7R2OPX', quantity: 2 },
      ]);

      state = cartReducer(state, add({ id: 'X8J2X6YH', quantity: 21 }));
      expect(state.cartItems).toEqual([
        { id: 'X7R2OPX', quantity: 2 },
        { id: 'X8J2X6YH', quantity: 21 }
      ]);
    });

    it('should remove elements from cart', () => {
      const removeAction = remove('X7R2OPX');
      const stateMock = {
        ...defaultStateMock,
        items: itemsMock,
        discountRules: discountRulesMock,
        cartItems: [
          { id: 'X7R2OPX', quantity: 2 },
          { id: 'X8J2X6YH', quantity: 21 }
        ],
        isLoading: false,
      };

      let state = cartReducer(stateMock, removeAction);
      expect(state.cartItems).toEqual([
        { id: 'X7R2OPX', quantity: 1 },
        { id: 'X8J2X6YH', quantity: 21 }
      ]);
    });

    it('should populate cart elements if not existing already upon adding or removing', () => {
      const removeAction = remove('X7R2OPX');
      const stateMock = {
        ...defaultStateMock,
        items: itemsMock,
        discountRules: discountRulesMock,
        isLoading: false,
      };

      let state = cartReducer(stateMock, removeAction);
      expect(state.cartItems).toEqual([
        { id: 'X7R2OPX', quantity: 0 },
      ]);

      const addAction = add({ id: 'X8J2X6YH' });
      state = cartReducer(state, addAction);
      expect(state.cartItems).toEqual([
        { id: 'X7R2OPX', quantity: 0 },
        { id: 'X8J2X6YH', quantity: 1 },
      ]);
    });

    it('should initialize a loading state upon requesting items', () => {
      const initializeAction = fetchItems.pending('cart/fetchItems/pending', {});
      const state = cartReducer(defaultStateMock, initializeAction);
      expect(state).toEqual({
        items: [],
        discountRules: [],
        cartItems: [],
        discountItems: [],
        isLoading: true,
        lastError: undefined,
      });
    });

    it('should populate state catalogue items and reset loading state upon fetching items', () => {
      const fulfilAction = fetchItems.fulfilled(pricingRulesMock, 'cart/fetchItems/fulfiled', {});
      const state = cartReducer(defaultStateMock, fulfilAction);
      expect(state).toEqual({
        items: itemsMock,
        discountRules: discountRulesMock,
        cartItems: [],
        discountItems: [],
        isLoading: false,
        lastError: undefined,
      });
    });

    it('should handle errors and populate an error state upon rejected items requests', () => {
      const rejectAction = fetchItems.rejected(new Error('Http error'), 'cart/fetchItems/rejected', {});
      const state = cartReducer(defaultStateMock, rejectAction);
      expect(state).toEqual({
        items: [],
        discountRules: [],
        cartItems: [],
        discountItems: [],
        isLoading: false,
        lastError: 'Http error',
      });
    });
  });
});
