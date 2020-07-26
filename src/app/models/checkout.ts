import { DiscountsService } from './../services';
import { CartItem, DiscountItem, ItemCode, PricingRules } from 'shopping-cart/types';
import { CheckoutScanner, CheckoutTotal } from './checkout.types';

/**
 * The Checkout class represents a stateful shopping cart object
 */
export class Checkout implements CheckoutScanner, CheckoutTotal {
  /**
   * Collection of different items types with quantities ordered per type currently in shopping cart
   * @readonly
   */
  readonly cartItems: CartItem[];

  /**
   * Current set of enabled discount items computed out of shopping cart
   * @readonly
   */
  readonly discountItems: DiscountItem[] = [];
  
  /**
   * Instantiate a Checkout object, defining the products catalogue upfront
   * @param pricingRules Object instance containing all products available and its pricing and discounts details
   * @param discounts Optional injectable DiscountsService dependency. If omitted, the Checkout model will internally instance its own with default settings
   */
  constructor(private readonly pricingRules: PricingRules, private readonly discountsService?: DiscountsService) {
    this.cartItems = this.pricingRules.items.map((item) => ({ 
      ...item,
      shortName: item.code.charAt(0).toUpperCase() + item.code.slice(1).toLowerCase(),
      quantity: 0
    }));
    this.discountsService = this.discountsService ?? new DiscountsService(pricingRules);
  }

  /**
   * Array of items ordered, informing of quantity per each
   * @readonly
   */
  get orderedItems(): CartItem[] {
    return this.cartItems.filter((cartItem) => cartItem.quantity > 0);
  }

  /**
   * Total amount of items ordered, irrespective of type
   * @readonly
   */
  get orderedItemsQuantity(): number {
    return this.orderedItems.reduce((totalQuantity, cartItem) => totalQuantity + cartItem.quantity, 0);
  }

  /**
   * Sub total or items ordered, bearing in mind unit prices and quantities
   * @readonly
   */
  get subTotal(): number {
    return this.cartItems.reduce((subTotal, item) => (item.quantity * item.price) + subTotal, 0);
  }

  /**
   * Total order cost once suming up all ordered items and deducting discounts
   */
  total(): number {
    const discountsSubTotal = this.discountItems.reduce((subTotal, discountItem) => subTotal + discountItem.subTotal, 0);

    return this.subTotal - discountsSubTotal;
  }

 /**
   * Increases the quantity by 1 from the overall amount of items currently ordered for a given product type
   * @param itemCode Code of the scanned product
   * @param quantity Optional cart item quantity which, if set, will override existing one
   * @returns CheckoutScanner interface providing support for running multiple chained calls to the scan() method
   */
  scan(itemCode: ItemCode, quantity?: number): CheckoutScanner {
    this.updateQuantityByItemCode(itemCode, (currentQuantity: number) => 
      quantity !== undefined ? (quantity > 0 ? quantity : 0) : (currentQuantity + 1)
    );

    this.updateDiscountsByItemCode(itemCode);

    return {
      scan: this.scan.bind(this),
    };
  }

  /**
   * Reduces the quantity by 1 from the overall amount of items currently ordered for a given product type
   * @param itemCode Code of the removed product
   */
  remove(itemCode: ItemCode): void {
    this.updateQuantityByItemCode(itemCode, (quantity: number) => quantity > 1 ? quantity - 1 : 0);
    this.updateDiscountsByItemCode(itemCode);
  }

  private updateQuantityByItemCode(itemCode: ItemCode, updateHandler: (quantity: number) => number): void {
    const itemIndex = this.cartItems.findIndex((cartItem) => cartItem.code === itemCode);

    if (itemIndex >= 0) {
      const quantity = updateHandler.call(this, this.cartItems[itemIndex].quantity);

      this.cartItems[itemIndex] = {
        ...this.cartItems[itemIndex],
        quantity,
      };
    }
  }

  private updateDiscountsByItemCode(itemCode: ItemCode): void {
    const cartItem = this.cartItems.find((cartItem) => cartItem.code === itemCode);
    const previousDiscounts = this.discountItems.filter((discountItem) => discountItem.itemCode !== itemCode);
    let updatedDiscounts: DiscountItem[] = [];

    if (cartItem && cartItem.quantity > 0) {
      updatedDiscounts = this.discountsService!.getDiscountsByCartItem(cartItem);
    }

    this.discountItems.length = 0;
    this.discountItems.push(...previousDiscounts, ...updatedDiscounts);
  }
}