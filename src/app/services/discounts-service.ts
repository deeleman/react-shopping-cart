import { CartItem, DiscountItem, DiscountRule, DiscountType, PricingRules } from '@shopping-cart/types';

/**
 * The DiscountsService class provides a simple API to compute discounts applicable
 * for particular cart items based on persisted pricing rules.
 * 
 * This class is meant to be used either as a standalone helper class instance 
 * or as a dependency injected into other model types.
 */
export class DiscountsService {
  private discountRules: DiscountRule[];

  /**
   * Instantiate a Discounts object, defining the discounts rules upfront and compounding up those which lack required metadata
   * @param pricingRules Object instance containing all products available and its pricing and discount details
   */
  constructor(pricingRules: PricingRules) {
    this.discountRules = pricingRules.discountRules
      .map((rule) => rule.type === DiscountType['2x1'] ? {...rule, minimumItems: 2 } : rule)
      .map((rule) => rule as DiscountRule)
  }

  /**
   * Fetches applicable discounts for an entire shopping cart
   * @param cartItems cart items to compute discounts applicable
   * @deprecated currently not in use and set to be phased out shortly
   */
  getDiscountsByCart(cartItems: CartItem[]): DiscountItem[] {
    return cartItems.reduce((discountItems, cartItem) =>
      [...discountItems, ...this.getDiscountsByCartItem(cartItem)],
      [] as DiscountItem[]);
  }

  /**
   * Fetches applicable discounts for a given cart item
   * @param cartItem cart item to compute discounts applicable
   * @
   */
  getDiscountsByCartItem(cartItem: CartItem): DiscountItem[] {
    const discountItems: DiscountItem[] = [];

    this.discountRules.forEach((discountRule) => {
      if (discountRule.eligibleItems.indexOf(cartItem.code) >= 0 && cartItem.quantity >= discountRule.minimumItems) {
        const discountItem = this.getDiscountItemByRule(cartItem, discountRule);
        if (discountItem.subTotal > 0) {
          discountItems.push(discountItem);
        }
      }
    });

    return discountItems;
  }

  private getDiscountItemByRule(cartItem: CartItem, discountRule: DiscountRule): DiscountItem {
    switch (discountRule.type) {
      case DiscountType['2x1']: {
        const subTotal = Math.floor(cartItem.quantity / 2) * cartItem.price;
        return this.composeDiscountItem(discountRule, cartItem, subTotal);
      }

      case DiscountType.Bulk: {
        const subTotal = Math.round(cartItem.quantity * cartItem.price * discountRule.discount! * 100) / 100;
        return this.composeDiscountItem(discountRule, cartItem, subTotal);
      }

      case DiscountType.PromoCode:
      default: {
        return this.composeDiscountItem(discountRule, cartItem);
      }
    }
  }

  private composeDiscountItem(discountRule: DiscountRule, cartItem: CartItem, subTotal = 0): DiscountItem {
    const cartItemName = cartItem.code.charAt(0).toUpperCase() + cartItem.code.slice(1).toLowerCase();
    const name = discountRule.type === DiscountType['2x1'] ? 
      `2x1 ${cartItemName} offer` :
      `x${discountRule.minimumItems} ${cartItemName} offer`;

    return {
      type: discountRule.type,
      itemCode: cartItem.code,
      name,
      subTotal,
    };
  }
}
