import { Item, DiscountRule, DiscountType } from 'shopping-cart/types';

export const dataService = async <T>(): Promise<T> => {
  const itemsMock: Item[] = [
    { id: 'X7R2OPX', name: 'React T-Shirt', price: 20.00 },
    { id: 'X2G2OPZ', name: 'React Coffee Mug', price: 5.00 },
    { id: 'X3W2OPY', name: 'React Cap', price: 10.00 },
    { id: 'X4J2OPW', name: 'React Sticker', price: 2.00 },
  ];
  
  const discountRulesMock: Partial<DiscountRule>[] = [
    { type: DiscountType['2x1'], eligibleItems: ['X2G2OPZ', 'X4J2OPW'] },
    { type: DiscountType.Bulk, eligibleItems: ['X7R2OPX'], discount: 0.05, minimumItems: 3 }
  ];
  
  return Promise
    .resolve<T>({ items: itemsMock, discountRules: discountRulesMock } as unknown as T);
};
