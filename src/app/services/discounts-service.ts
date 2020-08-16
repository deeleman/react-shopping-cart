import { DiscountItem, DiscountRule, DiscountType, CatalogueItem } from './../types';


const getDiscountItemByRule = (cartItem: CatalogueItem, discountRule: DiscountRule): DiscountItem => {
  switch (discountRule.type) {
    case DiscountType['2x1']: {
      const subTotal = Math.floor(cartItem.quantity / 2) * cartItem.price;
      return composeDiscountItem(discountRule, cartItem, subTotal);
    }

    case DiscountType.Bulk: {
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      const subTotal = Math.round(cartItem.quantity * cartItem.price * discountRule.discount! * 100) / 100;
      return composeDiscountItem(discountRule, cartItem, subTotal);
    }

    case DiscountType.PromoCode:
    default: {
      return composeDiscountItem(discountRule, cartItem);
    }
  }
};

const composeDiscountItem = (discountRule: DiscountRule, cartItem: CatalogueItem, subTotal = 0): DiscountItem => {
  const name = discountRule.type === DiscountType['2x1'] ? 
    `2x1 ${cartItem.shortName} offer` :
    `x${discountRule.minimumItems} ${cartItem.shortName} offer`;

  return {
    type: discountRule.type,
    itemCode: cartItem.code,
    name,
    subTotal,
  };
};

/**
 * Fetches applicable discounts for an entire shopping cart
 * @param cartItems cart items to compute discounts applicable
 * @param discountRule discount rules as retrieved from store
 */
export const getDiscountItems = (cartItems: CatalogueItem[], discountRules: DiscountRule[]): DiscountItem[] => {
  return cartItems.reduce((discountItems, cartItem) =>
    [...discountItems, ...getDiscountsByCartItem(cartItem, discountRules)],
    [] as DiscountItem[]);
};

/**
* Fetches applicable discounts for a given cart item
* @param cartItem cart item to compute discounts applicable
* @param discountRule discount rules as retrieved from store
*/
export const getDiscountsByCartItem = (cartItem: CatalogueItem, discountRules: DiscountRule[]): DiscountItem[] => {
 const discountItems: DiscountItem[] = [];

 discountRules.forEach((discountRule) => {
   const minimumItems = discountRule.type === DiscountType['2x1'] ? 2 : discountRule.minimumItems || 0;
   if (discountRule.eligibleItems.indexOf(cartItem.code) >= 0 && cartItem.quantity >= minimumItems) {
     const discountItem = getDiscountItemByRule(cartItem, discountRule);
     if (discountItem.subTotal > 0) {
       discountItems.push(discountItem);
     }
   }
 });

 return discountItems;
};
