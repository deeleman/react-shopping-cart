import * as productDiscountFixtures from '@shopping-cart/api/fixtures/product-discounts';
import * as productItemsFixtures from '@shopping-cart/api/fixtures/product-items';
import { CartItem, DiscountRule, DiscountType, Item, ItemCode, PricingRules } from '@shopping-cart/types';
import { DiscountsService } from './discounts-service';

describe('DiscountsService', () => {
  let discountService: DiscountsService;

  const mockMugCartItem: CartItem = { code: ItemCode.Mug, id: 'X2G2OPZ', name: 'Cabify Coffee Mug', quantity: 5, price: 5 };
  const expectedMugDiscount = { type: DiscountType['2x1'], itemCode: ItemCode.Mug, name: '2x1 Mug offer', subTotal: 10 };

  const mockShirtCartItem: CartItem = { code: ItemCode.TShirt, id: 'X7R2OPX', name: 'Cabify T-Shirt', quantity: 4, price: 20 };
  const expectedBulkShirtDiscount = { type: DiscountType.Bulk, itemCode: ItemCode.TShirt, name: 'x3 Shirt offer', subTotal: 4 };
  
  const pricingRules: PricingRules = {
    items: productItemsFixtures.default as Item[],
    discountRules: productDiscountFixtures.default as DiscountRule[],
  };

  beforeEach(() => discountService = new DiscountsService(pricingRules));

  it('should compute any 2x1 discounts applicable', () => {
    const discountItems = discountService.getDiscountsByCartItem(mockMugCartItem);

    expect(discountItems).toEqual([expectedMugDiscount]);
  });

  it('should compute any Bulk discounts applicable', () => {
    const discountItems = discountService.getDiscountsByCartItem(mockShirtCartItem);

    expect(discountItems).toEqual([expectedBulkShirtDiscount]);
  });

  it('should compute combined discounts applicable for a shopping cart', () => {
    const discountItems = discountService.getDiscountsByCart([mockMugCartItem, mockShirtCartItem]);

    expect(discountItems).toEqual([expectedMugDiscount, expectedBulkShirtDiscount]);
  });

});