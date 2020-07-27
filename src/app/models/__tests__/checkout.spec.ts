import * as productDiscountFixtures from 'shopping-cart/api/fixtures/product-discounts';
import * as productItemsFixtures from 'shopping-cart/api/fixtures/product-items';
import { CartItem, DiscountRule, Item, ItemCode, PricingRules, DiscountType, DiscountItem } from 'shopping-cart/types';
import { Checkout } from '../checkout';

const mockGetDiscountsByCartItem = jest.fn<DiscountItem[], [CartItem]>().mockReturnValue([]);
jest.mock('shopping-cart/services', () => ({
  DiscountsService: jest.fn().mockImplementation(() => ({
    getDiscountsByCartItem: mockGetDiscountsByCartItem
  })),
}));

describe('Checkout', () => {
  let checkout: Checkout;

  const pricingRules: PricingRules = {
    items: productItemsFixtures.default as Item[],
    discountRules: productDiscountFixtures.default as DiscountRule[],
  };

  beforeEach(() => checkout = new Checkout(pricingRules));

  afterEach(mockGetDiscountsByCartItem.mockClear);

  describe('upon instantiating', () => {
    it('should return a valid object instance', () => {
      expect(checkout).not.toBeUndefined();
    });

    it('should expose a cart where all items quantities set to 0', () => {
      const itemQuantities = checkout.cartItems.map((cartItem) => cartItem.quantity);

      expect(itemQuantities.every((itemQuantity) => itemQuantity === 0))
        .toBeTruthy();
    });

    it('should enhance item objects with shortened capitalized names', () => {
      expect(checkout.cartItems[0].shortName).toEqual('Shirt');
      expect(checkout.cartItems[1].shortName).toEqual('Mug');
      expect(checkout.cartItems[2].shortName).toEqual('Cap');
    });

    it('should expose an empty collection of items ordered', () => {
      expect(checkout.orderedItems).toEqual([]);
    });

    it('should yield 0 as total amount of ordered items', () => {
      expect(checkout.orderedItemsQuantity).toEqual(0);
    });

    it('should yield 0 as subTotal', () => {
      expect(checkout.subTotal).toEqual(0);
    });

    it('should return 0 when running the "total()" method', () => {
      expect(checkout.total()).toEqual(0);
    });
  });

  describe('upon adding and removing items', () => {
    it('should add a single new item to cart by running the scanning a valid item code', () => {
      checkout.scan(ItemCode.Mug);

      expect(checkout.cartItems)
        .toEqual([
          { id: 'X7R2OPX', code: ItemCode.TShirt, name: 'Cabify T-Shirt', shortName: 'Shirt', price: 20.00, quantity: 0 },
          { id: 'X2G2OPZ', code: ItemCode.Mug, name: 'Cabify Coffee Mug', shortName: 'Mug', price: 5.00, quantity: 1 },
          { id: 'X3W2OPY', code: ItemCode.Cap, name: 'Cabify Cap', shortName: 'Cap', price: 10.00, quantity: 0 },
        ]);

      expect(checkout.orderedItems)
        .toEqual([
          { id: 'X2G2OPZ', code: ItemCode.Mug, name: 'Cabify Coffee Mug', shortName: 'Mug', price: 5.00, quantity: 1 },
        ]);

      expect(checkout.orderedItemsQuantity)
        .toEqual(1);

      expect(checkout.subTotal)
        .toEqual(5.00);
    });

    it('should add distinct items to cart by chain-scanning different item codes', () => {
      checkout.scan(ItemCode.Mug).scan(ItemCode.Cap).scan(ItemCode.TShirt);

      expect(checkout.cartItems)
        .toEqual([
          { id: 'X7R2OPX', code: ItemCode.TShirt, name: 'Cabify T-Shirt', shortName: 'Shirt', price: 20.00, quantity: 1 },
          { id: 'X2G2OPZ', code: ItemCode.Mug, name: 'Cabify Coffee Mug', shortName: 'Mug', price: 5.00, quantity: 1 },
          { id: 'X3W2OPY', code: ItemCode.Cap, name: 'Cabify Cap', shortName: 'Cap', price: 10.00, quantity: 1 },
        ]);

      expect(checkout.orderedItems)
        .toEqual([
          { id: 'X7R2OPX', code: ItemCode.TShirt, name: 'Cabify T-Shirt', shortName: 'Shirt', price: 20.00, quantity: 1 },
          { id: 'X2G2OPZ', code: ItemCode.Mug, name: 'Cabify Coffee Mug', shortName: 'Mug', price: 5.00, quantity: 1 },
          { id: 'X3W2OPY', code: ItemCode.Cap, name: 'Cabify Cap', shortName: 'Cap', price: 10.00, quantity: 1 },
        ]);

      expect(checkout.orderedItemsQuantity)
        .toEqual(3);
    });

    it('should throw an exception when trying to either add or remove a non existing product by code', () => {
      expect(() => checkout.scan('foo')).toThrowError('Could not find a product with code "foo"')
      expect(() => checkout.remove('bar')).toThrowError('Could not find a product with code "bar"')
    });

    it('should add several units of different items to cart by scanning multiple item codes separately', () => {
      checkout.scan(ItemCode.Mug);
      checkout.scan(ItemCode.TShirt);
      checkout.scan(ItemCode.Cap);
      checkout.scan(ItemCode.Mug);

      expect(checkout.cartItems)
        .toEqual([
          { id: 'X7R2OPX', code: ItemCode.TShirt, name: 'Cabify T-Shirt', shortName: 'Shirt', price: 20.00, quantity: 1 },
          { id: 'X2G2OPZ', code: ItemCode.Mug, name: 'Cabify Coffee Mug', shortName: 'Mug', price: 5.00, quantity: 2 },
          { id: 'X3W2OPY', code: ItemCode.Cap, name: 'Cabify Cap', shortName: 'Cap', price: 10.00, quantity: 1 },
        ]);

      expect(checkout.orderedItems)
        .toEqual([
          { id: 'X7R2OPX', code: ItemCode.TShirt, name: 'Cabify T-Shirt', shortName: 'Shirt', price: 20.00, quantity: 1 },
          { id: 'X2G2OPZ', code: ItemCode.Mug, name: 'Cabify Coffee Mug', shortName: 'Mug', price: 5.00, quantity: 2 },
          { id: 'X3W2OPY', code: ItemCode.Cap, name: 'Cabify Cap', shortName: 'Cap', price: 10.00, quantity: 1 },
        ]);

      expect(checkout.orderedItemsQuantity)
        .toEqual(4);
    });

    it('should add several units of same item to cart by scanning same item code multiple times separately', () => {
      checkout.scan(ItemCode.Mug);
      checkout.scan(ItemCode.Mug);
      checkout.scan(ItemCode.Mug);

      expect(checkout.cartItems)
        .toEqual([
          { id: 'X7R2OPX', code: ItemCode.TShirt, name: 'Cabify T-Shirt', shortName: 'Shirt', price: 20.00, quantity: 0 },
          { id: 'X2G2OPZ', code: ItemCode.Mug, name: 'Cabify Coffee Mug', shortName: 'Mug', price: 5.00, quantity: 3 },
          { id: 'X3W2OPY', code: ItemCode.Cap, name: 'Cabify Cap', shortName: 'Cap', price: 10.00, quantity: 0 },
        ]);

      expect(checkout.orderedItems)
        .toEqual([
          { id: 'X2G2OPZ', code: ItemCode.Mug, name: 'Cabify Coffee Mug', shortName: 'Mug', price: 5.00, quantity: 3 },
        ]);

      expect(checkout.orderedItemsQuantity)
        .toEqual(3);
    });

    it('should remove previously added items by passing a valid item code to the remove method', () => {
      checkout.scan(ItemCode.Mug).scan(ItemCode.Mug).scan(ItemCode.Cap).scan(ItemCode.TShirt).scan(ItemCode.Cap);
      checkout.remove(ItemCode.Mug);
      checkout.remove(ItemCode.Cap);

      expect(checkout.cartItems)
        .toEqual([
          { id: 'X7R2OPX', code: ItemCode.TShirt, name: 'Cabify T-Shirt', shortName: 'Shirt', price: 20.00, quantity: 1 },
          { id: 'X2G2OPZ', code: ItemCode.Mug, name: 'Cabify Coffee Mug', shortName: 'Mug', price: 5.00, quantity: 1 },
          { id: 'X3W2OPY', code: ItemCode.Cap, name: 'Cabify Cap', shortName: 'Cap', price: 10.00, quantity: 1 },
        ]);

      expect(checkout.orderedItems)
        .toEqual([
          { id: 'X7R2OPX', code: ItemCode.TShirt, name: 'Cabify T-Shirt', shortName: 'Shirt', price: 20.00, quantity: 1 },
          { id: 'X2G2OPZ', code: ItemCode.Mug, name: 'Cabify Coffee Mug', shortName: 'Mug', price: 5.00, quantity: 1 },
          { id: 'X3W2OPY', code: ItemCode.Cap, name: 'Cabify Cap', shortName: 'Cap', price: 10.00, quantity: 1 },
        ]);

      expect(checkout.orderedItemsQuantity)
        .toEqual(3);
    });

    it('should never set a cart item quantity below zero after removing not ordered items', () => {
      checkout.scan(ItemCode.Cap).scan(ItemCode.TShirt).scan(ItemCode.Cap);
      checkout.remove(ItemCode.Mug);
      checkout.remove(ItemCode.Mug);
      checkout.remove(ItemCode.Mug);

      expect(checkout.cartItems)
        .toEqual([
          { id: 'X7R2OPX', code: ItemCode.TShirt, name: 'Cabify T-Shirt', shortName: 'Shirt', price: 20.00, quantity: 1 },
          { id: 'X2G2OPZ', code: ItemCode.Mug, name: 'Cabify Coffee Mug', shortName: 'Mug', price: 5.00, quantity: 0 },
          { id: 'X3W2OPY', code: ItemCode.Cap, name: 'Cabify Cap', shortName: 'Cap', price: 10.00, quantity: 2 },
        ]);

      expect(checkout.orderedItems)
        .toEqual([
          { id: 'X7R2OPX', code: ItemCode.TShirt, name: 'Cabify T-Shirt', shortName: 'Shirt', price: 20.00, quantity: 1 },
          { id: 'X3W2OPY', code: ItemCode.Cap, name: 'Cabify Cap', shortName: 'Cap', price: 10.00, quantity: 2 },
        ]);

      expect(checkout.orderedItemsQuantity)
        .toEqual(3);
    });

    it('should never set a cart item quantity below zero after removing items too many times', () => {
      checkout.scan(ItemCode.Mug).scan(ItemCode.Cap).scan(ItemCode.TShirt).scan(ItemCode.Cap);
      checkout.remove(ItemCode.Mug);
      checkout.remove(ItemCode.Mug);
      checkout.remove(ItemCode.Mug);

      expect(checkout.cartItems)
        .toEqual([
          { id: 'X7R2OPX', code: ItemCode.TShirt, name: 'Cabify T-Shirt', shortName: 'Shirt', price: 20.00, quantity: 1 },
          { id: 'X2G2OPZ', code: ItemCode.Mug, name: 'Cabify Coffee Mug', shortName: 'Mug', price: 5.00, quantity: 0 },
          { id: 'X3W2OPY', code: ItemCode.Cap, name: 'Cabify Cap', shortName: 'Cap', price: 10.00, quantity: 2 },
        ]);

      expect(checkout.orderedItems)
        .toEqual([
          { id: 'X7R2OPX', code: ItemCode.TShirt, name: 'Cabify T-Shirt', shortName: 'Shirt', price: 20.00, quantity: 1 },
          { id: 'X3W2OPY', code: ItemCode.Cap, name: 'Cabify Cap', shortName: 'Cap', price: 10.00, quantity: 2 },
        ]);

      expect(checkout.orderedItemsQuantity)
        .toEqual(3);
    });
  });

  describe('upon computing purchase totals', () => {
    it('should compute the updated subtotal after chain-scanning a product', () => {
      checkout.scan(ItemCode.Mug);

      expect(checkout.subTotal)
        .toEqual(5.00);
    });

    it('should compute the updated subtotal after chain-scanning several products', () => {
      checkout.scan(ItemCode.Mug).scan(ItemCode.Mug).scan(ItemCode.TShirt);

      expect(checkout.subTotal)
        .toEqual(30.00);
    });

    it('should compute the updated subtotal after scanning several products separately', () => {
      checkout.scan(ItemCode.Mug);
      checkout.scan(ItemCode.TShirt);
      checkout.scan(ItemCode.Mug);

      expect(checkout.subTotal)
        .toEqual(30.00);
    });
  });

  describe('upon manually setting up the quantity of a product', () => {
    it('should support setting a handpicked cart item quantity', () => {
      checkout.scan(ItemCode.Mug, 7);

      expect(checkout.cartItems)
        .toEqual([
          { id: 'X7R2OPX', code: ItemCode.TShirt, name: 'Cabify T-Shirt', shortName: 'Shirt', price: 20.00, quantity: 0 },
          { id: 'X2G2OPZ', code: ItemCode.Mug, name: 'Cabify Coffee Mug', shortName: 'Mug', price: 5.00, quantity: 7 },
          { id: 'X3W2OPY', code: ItemCode.Cap, name: 'Cabify Cap', shortName: 'Cap', price: 10.00, quantity: 0 },
        ]);

      expect(checkout.orderedItems)
        .toEqual([
          { id: 'X2G2OPZ', code: ItemCode.Mug, name: 'Cabify Coffee Mug', shortName: 'Mug', price: 5.00, quantity: 7 },
        ]);

      expect(checkout.orderedItemsQuantity)
        .toEqual(7);
    });

    it('should override any previous cart item quantity when setting a cart item quantity manually', () => {
      checkout.scan(ItemCode.TShirt).scan(ItemCode.Mug).scan(ItemCode.TShirt, 11);

      expect(checkout.cartItems)
        .toEqual([
          { id: 'X7R2OPX', code: ItemCode.TShirt, name: 'Cabify T-Shirt', shortName: 'Shirt', price: 20.00, quantity: 11 },
          { id: 'X2G2OPZ', code: ItemCode.Mug, name: 'Cabify Coffee Mug', shortName: 'Mug', price: 5.00, quantity: 1 },
          { id: 'X3W2OPY', code: ItemCode.Cap, name: 'Cabify Cap', shortName: 'Cap', price: 10.00, quantity: 0 },
        ]);

      expect(checkout.orderedItems)
        .toEqual([
          { id: 'X7R2OPX', code: ItemCode.TShirt, name: 'Cabify T-Shirt', shortName: 'Shirt', price: 20.00, quantity: 11 },
          { id: 'X2G2OPZ', code: ItemCode.Mug, name: 'Cabify Coffee Mug', shortName: 'Mug', price: 5.00, quantity: 1 },
        ]);

      expect(checkout.orderedItemsQuantity)
        .toEqual(12);
    });

    it('should reset a cart item quantity to zero when manually setting the value to 0 or below 0', () => {
      checkout.scan(ItemCode.TShirt).scan(ItemCode.Mug).scan(ItemCode.Mug)
      checkout.scan(ItemCode.TShirt, 0).scan(ItemCode.Mug, -6);

      expect(checkout.cartItems)
        .toEqual([
          { id: 'X7R2OPX', code: ItemCode.TShirt, name: 'Cabify T-Shirt', shortName: 'Shirt', price: 20.00, quantity: 0 },
          { id: 'X2G2OPZ', code: ItemCode.Mug, name: 'Cabify Coffee Mug', shortName: 'Mug', price: 5.00, quantity: 0 },
          { id: 'X3W2OPY', code: ItemCode.Cap, name: 'Cabify Cap', shortName: 'Cap', price: 10.00, quantity: 0 },
        ]);

      expect(checkout.orderedItems)
        .toEqual([]);

      expect(checkout.orderedItemsQuantity)
        .toEqual(0);
    });
  });

  describe('upon providing applicable discounts', () => {
    const mockMugCartItem: CartItem = { code: ItemCode.Mug, id: 'X2G2OPZ', name: 'Cabify Coffee Mug', shortName: 'Mug', quantity: 2, price: 5 };
    const mockMugDiscount = { type: DiscountType['2x1'], itemCode: ItemCode.Mug, name: '2x1 Mug offer', subTotal: 5 };
    const mockShirtCartItem: CartItem = { code: ItemCode.TShirt, id: 'X7R2OPX', name: 'Cabify T-Shirt', shortName: 'Shirt', quantity: 3, price: 20 };
    const mockBulkShirtDiscount = { type: DiscountType.Bulk, itemCode: ItemCode.TShirt, name: 'x3 Shirt offer', subTotal: 3 };

    it('should initialize with no discounts', () => {
      expect(checkout.discountItems).toEqual([]);
    });

    it('should compute applicable discounts upon scanning product items', () => {
      mockGetDiscountsByCartItem
        .mockImplementationOnce(() =>[mockMugDiscount])
        .mockImplementationOnce(() =>[mockBulkShirtDiscount]);

      checkout.scan(ItemCode.Mug, 2).scan(ItemCode.TShirt, 3);
      
      expect(mockGetDiscountsByCartItem).toHaveBeenCalledTimes(2);
      expect(mockGetDiscountsByCartItem).toHaveBeenCalledWith<[CartItem]>(mockMugCartItem);
      expect(mockGetDiscountsByCartItem).toHaveBeenCalledWith<[CartItem]>(mockShirtCartItem);
      expect(checkout.discountItems).toEqual([mockMugDiscount, mockBulkShirtDiscount]);
    });

    it('should recompute applicable discounts upon removing product items', () => {
      mockGetDiscountsByCartItem
        .mockImplementationOnce(() =>[mockMugDiscount])
        .mockImplementationOnce(() =>[mockBulkShirtDiscount])
        .mockImplementationOnce(() =>[]);

      checkout.scan(ItemCode.Mug, 2).scan(ItemCode.TShirt, 3);
      checkout.remove(ItemCode.Mug);

      expect(mockGetDiscountsByCartItem).toHaveBeenCalledTimes(3);
      expect(checkout.discountItems).toEqual([mockBulkShirtDiscount]);
    });

    it('should deduct applicable discounts from total', () => {
      mockGetDiscountsByCartItem
        .mockImplementationOnce(() =>[mockMugDiscount])
        .mockImplementationOnce(() =>[mockBulkShirtDiscount]);

      checkout.scan(ItemCode.Mug, 2).scan(ItemCode.TShirt, 3);

      // Expected total computation: 5.00 + 5.00 + 20.00 + 20.00 + 20.00 - 5.00 - 3.00
      expect(checkout.total()).toEqual(62);
    });

  });
});