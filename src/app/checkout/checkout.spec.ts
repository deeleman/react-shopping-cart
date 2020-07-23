import * as productItemsFixtures from '@shopping-cart/api/fixtures/product-items.json';

import { Checkout } from './checkout';
import { PricingRules, Item, ItemCode } from './checkout.models'

describe('Checkout', () => {
  const pricingRules: PricingRules = {
    items: productItemsFixtures.default as Item[]
  };
  
  let checkout: Checkout;

  beforeEach(() => checkout = new Checkout(pricingRules));

  describe('upon instantiating', () => {
    it('should actually return a valid object instance', () => {
      expect(checkout).not.toBeUndefined();
    });

    it('should expose a cart where all item quantities are set to 0', () => {
      const itemQuantities = checkout.cartItems.map((cartItem) => cartItem.quantity);

      expect(itemQuantities.every((itemQuantity) => itemQuantity === 0))
        .toBeTruthy();
    });

    it('should expose an empty collection of ordered items', () => {
      expect(checkout.orderedItems).toEqual([]);
    });

    it('should return 0 when reuqesting total amount of items ordered', () => {
      expect(checkout.orderedItemsQuantity).toEqual(0);
    });

    it('should yield 0 from its "subTotal" property', () => {
      expect(checkout.subTotal).toEqual(0);
    });

    it('should yield 0 when running its "total()" method', () => {
      expect(checkout.total()).toEqual(0);
    });
  });

  describe('upon adding and removing items', () => {
    it('should add a new item to cart by running the "scan()" method with an ItemCode value', () => {
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
  
    it('should add several units of same item to cart by CHAIN-RUNNING the "scan()" multiple times with same ItemCode value', () => {
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
  
    it('should compute the updated subtotal after CHAIN-RUNNING the "scan()" multiple times with same ItemCode value', () => {
      checkout.scan(ItemCode.Mug).scan(ItemCode.Mug).scan(ItemCode.Mug);

      expect(checkout.subTotal)
        .toEqual(15.00);
    });
  
    it('should add several units of same item to cart by separately running the "scan()" multiple times with same ItemCode value', () => {
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

    it('should compute the updated subtotal after separately running the "scan()" multiple times with same ItemCode value', () => {
      checkout.scan(ItemCode.Mug);
      checkout.scan(ItemCode.Mug);
      checkout.scan(ItemCode.Mug);

      expect(checkout.subTotal)
        .toEqual(15.00);
    });

    it('should remove items added previously upon running the remove() method with a given ItemCode value', () => {
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

    it('should not set any quantity value below zero when removing items that feature zero quantity already', () => {
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

    it('should not set any quantity value below zero when removing items', () => {
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

  describe('upon manually setting up the quantity of a product', () => {
    // TBD...
  });
});