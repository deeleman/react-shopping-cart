import * as productItemsFixtures from '@shopping-cart/api/fixtures/product-items.json';

import { Checkout } from './checkout';
import { PricingRules, Item, ItemCode } from './types'

describe('Checkout', () => {
  let checkout: Checkout;

  const pricingRules: PricingRules = {
    items: productItemsFixtures.default as Item[]
  };

  beforeEach(() => checkout = new Checkout(pricingRules));

  describe('upon instantiating', () => {
    it('should return a valid object instance', () => {
      expect(checkout).not.toBeUndefined();
    });

    it('should expose a cart where all items quantities set to 0', () => {
      const itemQuantities = checkout.cartItems.map((cartItem) => cartItem.quantity);

      expect(itemQuantities.every((itemQuantity) => itemQuantity === 0))
        .toBeTruthy();
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
          { id: 'X7R2OPX', code: ItemCode.TShirt, name: 'Cabify T-Shirt', price: 20.00, quantity: 0 },
          { id: 'X2G2OPZ', code: ItemCode.Mug, name: 'Cabify Coffee Mug', price: 5.00, quantity: 1 },
          { id: 'X3W2OPY', code: ItemCode.Cap, name: 'Cabify Cap', price: 10.00, quantity: 0 },
        ]);

      expect(checkout.orderedItems)
        .toEqual([
          { id: 'X2G2OPZ', code: ItemCode.Mug, name: 'Cabify Coffee Mug', price: 5.00, quantity: 1 },
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
          { id: 'X7R2OPX', code: ItemCode.TShirt, name: 'Cabify T-Shirt', price: 20.00, quantity: 1 },
          { id: 'X2G2OPZ', code: ItemCode.Mug, name: 'Cabify Coffee Mug', price: 5.00, quantity: 1 },
          { id: 'X3W2OPY', code: ItemCode.Cap, name: 'Cabify Cap', price: 10.00, quantity: 1 },
        ]);

      expect(checkout.orderedItems)
        .toEqual([
          { id: 'X7R2OPX', code: ItemCode.TShirt, name: 'Cabify T-Shirt', price: 20.00, quantity: 1 },
          { id: 'X2G2OPZ', code: ItemCode.Mug, name: 'Cabify Coffee Mug', price: 5.00, quantity: 1 },
          { id: 'X3W2OPY', code: ItemCode.Cap, name: 'Cabify Cap', price: 10.00, quantity: 1 },
        ]);

      expect(checkout.orderedItemsQuantity)
        .toEqual(3);
    });
  
    it('should add several units of same item to cart by chain-scanning the same item code multiple times', () => {
      checkout.scan(ItemCode.Mug).scan(ItemCode.Mug).scan(ItemCode.Mug);

      expect(checkout.cartItems)
        .toEqual([
          { id: 'X7R2OPX', code: ItemCode.TShirt, name: 'Cabify T-Shirt', price: 20.00, quantity: 0 },
          { id: 'X2G2OPZ', code: ItemCode.Mug, name: 'Cabify Coffee Mug', price: 5.00, quantity: 3 },
          { id: 'X3W2OPY', code: ItemCode.Cap, name: 'Cabify Cap', price: 10.00, quantity: 0 },
        ]);

      expect(checkout.orderedItems)
        .toEqual([
          { id: 'X2G2OPZ', code: ItemCode.Mug, name: 'Cabify Coffee Mug', price: 5.00, quantity: 3 },
        ]);

      expect(checkout.orderedItemsQuantity)
        .toEqual(3);
    });
  
    it('should add several units of different items to cart by scanning multiple item codes separately', () => {
      checkout.scan(ItemCode.Mug);
      checkout.scan(ItemCode.TShirt);
      checkout.scan(ItemCode.Cap);
      checkout.scan(ItemCode.Mug);

      expect(checkout.cartItems)
        .toEqual([
          { id: 'X7R2OPX', code: ItemCode.TShirt, name: 'Cabify T-Shirt', price: 20.00, quantity: 1 },
          { id: 'X2G2OPZ', code: ItemCode.Mug, name: 'Cabify Coffee Mug', price: 5.00, quantity: 2 },
          { id: 'X3W2OPY', code: ItemCode.Cap, name: 'Cabify Cap', price: 10.00, quantity: 1 },
        ]);

      expect(checkout.orderedItems)
        .toEqual([
          { id: 'X7R2OPX', code: ItemCode.TShirt, name: 'Cabify T-Shirt', price: 20.00, quantity: 1 },
          { id: 'X2G2OPZ', code: ItemCode.Mug, name: 'Cabify Coffee Mug', price: 5.00, quantity: 2 },
          { id: 'X3W2OPY', code: ItemCode.Cap, name: 'Cabify Cap', price: 10.00, quantity: 1 },
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
          { id: 'X7R2OPX', code: ItemCode.TShirt, name: 'Cabify T-Shirt', price: 20.00, quantity: 0 },
          { id: 'X2G2OPZ', code: ItemCode.Mug, name: 'Cabify Coffee Mug', price: 5.00, quantity: 3 },
          { id: 'X3W2OPY', code: ItemCode.Cap, name: 'Cabify Cap', price: 10.00, quantity: 0 },
        ]);

      expect(checkout.orderedItems)
        .toEqual([
          { id: 'X2G2OPZ', code: ItemCode.Mug, name: 'Cabify Coffee Mug', price: 5.00, quantity: 3 },
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
          { id: 'X7R2OPX', code: ItemCode.TShirt, name: 'Cabify T-Shirt', price: 20.00, quantity: 1 },
          { id: 'X2G2OPZ', code: ItemCode.Mug, name: 'Cabify Coffee Mug', price: 5.00, quantity: 1 },
          { id: 'X3W2OPY', code: ItemCode.Cap, name: 'Cabify Cap', price: 10.00, quantity: 1 },
        ]);

        expect(checkout.orderedItems)
          .toEqual([
            { id: 'X7R2OPX', code: ItemCode.TShirt, name: 'Cabify T-Shirt', price: 20.00, quantity: 1 },
            { id: 'X2G2OPZ', code: ItemCode.Mug, name: 'Cabify Coffee Mug', price: 5.00, quantity: 1 },
            { id: 'X3W2OPY', code: ItemCode.Cap, name: 'Cabify Cap', price: 10.00, quantity: 1 },
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
          { id: 'X7R2OPX', code: ItemCode.TShirt, name: 'Cabify T-Shirt', price: 20.00, quantity: 1 },
          { id: 'X2G2OPZ', code: ItemCode.Mug, name: 'Cabify Coffee Mug', price: 5.00, quantity: 0 },
          { id: 'X3W2OPY', code: ItemCode.Cap, name: 'Cabify Cap', price: 10.00, quantity: 2 },
        ]);

        expect(checkout.orderedItems)
          .toEqual([
            { id: 'X7R2OPX', code: ItemCode.TShirt, name: 'Cabify T-Shirt', price: 20.00, quantity: 1 },
            { id: 'X3W2OPY', code: ItemCode.Cap, name: 'Cabify Cap', price: 10.00, quantity: 2 },
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
          { id: 'X7R2OPX', code: ItemCode.TShirt, name: 'Cabify T-Shirt', price: 20.00, quantity: 1 },
          { id: 'X2G2OPZ', code: ItemCode.Mug, name: 'Cabify Coffee Mug', price: 5.00, quantity: 0 },
          { id: 'X3W2OPY', code: ItemCode.Cap, name: 'Cabify Cap', price: 10.00, quantity: 2 },
        ]);

        expect(checkout.orderedItems)
          .toEqual([
            { id: 'X7R2OPX', code: ItemCode.TShirt, name: 'Cabify T-Shirt', price: 20.00, quantity: 1 },
            { id: 'X3W2OPY', code: ItemCode.Cap, name: 'Cabify Cap', price: 10.00, quantity: 2 },
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
          { id: 'X7R2OPX', code: ItemCode.TShirt, name: 'Cabify T-Shirt', price: 20.00, quantity: 0 },
          { id: 'X2G2OPZ', code: ItemCode.Mug, name: 'Cabify Coffee Mug', price: 5.00, quantity: 7 },
          { id: 'X3W2OPY', code: ItemCode.Cap, name: 'Cabify Cap', price: 10.00, quantity: 0 },
        ]);

      expect(checkout.orderedItems)
        .toEqual([
          { id: 'X2G2OPZ', code: ItemCode.Mug, name: 'Cabify Coffee Mug', price: 5.00, quantity: 7 },
        ]);

      expect(checkout.orderedItemsQuantity)
        .toEqual(7);
    });

    it('should override any previous cart item quantity when setting a cart item quantity manually', () => {
      checkout.scan(ItemCode.TShirt).scan(ItemCode.Mug).scan(ItemCode.TShirt, 11);

      expect(checkout.cartItems)
        .toEqual([
          { id: 'X7R2OPX', code: ItemCode.TShirt, name: 'Cabify T-Shirt', price: 20.00, quantity: 11 },
          { id: 'X2G2OPZ', code: ItemCode.Mug, name: 'Cabify Coffee Mug', price: 5.00, quantity: 1 },
          { id: 'X3W2OPY', code: ItemCode.Cap, name: 'Cabify Cap', price: 10.00, quantity: 0 },
        ]);

      expect(checkout.orderedItems)
        .toEqual([
          { id: 'X7R2OPX', code: ItemCode.TShirt, name: 'Cabify T-Shirt', price: 20.00, quantity: 11 },
          { id: 'X2G2OPZ', code: ItemCode.Mug, name: 'Cabify Coffee Mug', price: 5.00, quantity: 1 },
        ]);

      expect(checkout.orderedItemsQuantity)
        .toEqual(12);
    });

    it('should reset a cart item quantity to zero when manually setting the value to 0 or below 0', () => {
      checkout.scan(ItemCode.TShirt).scan(ItemCode.Mug).scan(ItemCode.Mug)
      checkout.scan(ItemCode.TShirt, 0).scan(ItemCode.Mug, -6);

      expect(checkout.cartItems)
        .toEqual([
          { id: 'X7R2OPX', code: ItemCode.TShirt, name: 'Cabify T-Shirt', price: 20.00, quantity: 0 },
          { id: 'X2G2OPZ', code: ItemCode.Mug, name: 'Cabify Coffee Mug', price: 5.00, quantity: 0 },
          { id: 'X3W2OPY', code: ItemCode.Cap, name: 'Cabify Cap', price: 10.00, quantity: 0 },
        ]);

      expect(checkout.orderedItems)
        .toEqual([]);

      expect(checkout.orderedItemsQuantity)
        .toEqual(0);
    });
  });
});