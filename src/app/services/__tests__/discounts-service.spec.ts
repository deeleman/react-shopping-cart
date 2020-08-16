import * as productDiscountFixtures from 'shopping-cart-api/fixtures/product-discounts';
import { CatalogueItem, DiscountRule, DiscountType } from 'shopping-cart/types';
import { getDiscounts, getDiscountsByCartItem } from '../discounts-service';

describe('getDiscounts', () => {
  const mockMugCatalogueItem: CatalogueItem = { id: 'X2G2OPZ', name: 'React Coffee Mug', quantity: 5, price: 5 };
  const expectedMugDiscount = { type: DiscountType['2x1'], name: '2x1 React Coffee Mug offer', subTotal: 10 };

  const mockShirtCatalogueItem: CatalogueItem = { id: 'X7R2OPX', name: 'React T-Shirt', quantity: 4, price: 20 };
  const expectedBulkShirtDiscount = { type: DiscountType.Bulk, name: 'x3 React T-Shirt offer', subTotal: 4 };

  const mockCapCatalogueItem: CatalogueItem = { id: 'X3W2OPY', name: 'React Cap', quantity: 5, price: 10 };
  
  const discountRules: DiscountRule[] = productDiscountFixtures.default;

  it('should compute any 2x1 discounts applicable', () => {
    const discountItems = getDiscountsByCartItem(mockMugCatalogueItem, discountRules);

    expect(discountItems).toEqual([expectedMugDiscount]);
  });

  it('should compute any Bulk discounts applicable', () => {
    const discountItems = getDiscountsByCartItem(mockShirtCatalogueItem, discountRules);

    expect(discountItems).toEqual([expectedBulkShirtDiscount]);
  });

  it('should yield no results if no discounts apply or feature 0 value', () => {
    const discountItems = getDiscountsByCartItem(mockCapCatalogueItem, discountRules);

    expect(discountItems).toEqual([]);
  });

  it('should yield no results if cart item features 0 units', () => {
    const cartItem: CatalogueItem = { ...mockShirtCatalogueItem, quantity: 0 }
    const discountItems = getDiscountsByCartItem(cartItem, discountRules);

    expect(discountItems).toEqual([]);
  });

  it('should compute combined discounts applicable for a shopping cart', () => {
    const cartItems = [mockMugCatalogueItem, mockShirtCatalogueItem];
    const discountItems = getDiscounts(cartItems, discountRules);

    expect(discountItems).toEqual([expectedMugDiscount, expectedBulkShirtDiscount]);
  });

});