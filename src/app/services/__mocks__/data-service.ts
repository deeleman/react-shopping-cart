import { Item, ItemCode, DiscountRule, DiscountType } from 'shopping-cart/types';

export const dataService = async <T>(): Promise<T> => {
  const itemsMock: Item[] = [
    { id: 'X7R2OPX', code: ItemCode.TShirt, name: 'Cabify T-Shirt', price: 20.00 },
    { id: 'X2G2OPZ', code: ItemCode.Mug, name: 'Cabify Coffee Mug', price: 5.00 },
    { id: 'X3W2OPY', code: ItemCode.Cap, name: 'Cabify Cap', price: 10.00 },
  ];
  
  const discountRulesMock: Partial<DiscountRule>[] = [
    { type: DiscountType['2x1'], eligibleItems: [ItemCode.Mug] },
    { type: DiscountType.Bulk, eligibleItems: [ItemCode.TShirt], discount: 0.05, minimumItems: 3 }
  ];
  
  return Promise
    .resolve<T>({ items: itemsMock, discountRules: discountRulesMock } as unknown as T);
};
