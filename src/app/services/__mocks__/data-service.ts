import { Item, ItemCode } from 'shopping-cart/types';

export const dataService = async <T>(settings: Record<keyof T, string>): Promise<T> => {
  const itemsMock: Item[] = [
    { id: 'X7R2OPX', code: ItemCode.TShirt, name: 'Cabify T-Shirt', price: 20.00 },
    { id: 'X2G2OPZ', code: ItemCode.Mug, name: 'Cabify Coffee Mug', price: 5.00 },
    { id: 'X3W2OPY', code: ItemCode.Cap, name: 'Cabify Cap', price: 10.00 },
  ];
  
  const discountRulesMock = [
    { type: '2x1', itemCode: ItemCode.Mug, name: '2x1 Mug offer', subTotal: 10 },
    { type: 'bulk', itemCode: ItemCode.TShirt, name: 'x3 Shirt offer', subTotal: 4 },
  ];
  
  return Promise
    .resolve<T>({ items: itemsMock, discountRules: discountRulesMock } as unknown as T);
};
