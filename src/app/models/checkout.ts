import { PricingRules, ItemCode, ItemScanner, CartItem } from './types';

/**
 * The Checkout class represents a stateful shopping cart object
 */
export class Checkout implements ItemScanner {
  /**
   * Collection of different items types with quantities ordered per type currently in shopping cart
   * @readonly
   */
  readonly cartItems: CartItem[];

  /**
   * Instantiate a Checkout object, defining the products catalogue upfront
   * @param pricingRules Object instance containing all products available and its pricing details
   */
  constructor(private readonly pricingRules: PricingRules) {
    this.cartItems = this.pricingRules.items.map((item) => ({ ...item, quantity: 0 }))
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
    return this.cartItems.reduce((subTotal, item) => (item.quantity * item.price) + subTotal, 0)
  }

 /**
   * Increases the quantity by 1 from the overall amount of items currently ordered for a given product type
   * @param itemCode Code of the scanned product
   * @param quantity Optional cart item quantity which, if set, will override existing one
   * @returns ItemScanner interface providing support for running multiple chained calls to the scan() method
   */
  scan(itemCode: ItemCode, quantity?: number): ItemScanner {
    this.updateQuantityByItemCode(itemCode, (currentQuantity: number) => 
      quantity !== undefined ? (quantity > 0 ? quantity : 0) : (currentQuantity + 1)
    );

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
  }

  /**
   * Total order cost
   */
  total(): number {
    return this.subTotal;
  }

  private updateQuantityByItemCode(itemCode: ItemCode, updateHandler: (quantity: number) => number): void {
    const itemIndex = this.cartItems.findIndex((cartItem) => cartItem.code === itemCode);
    if (itemIndex >= 0) {
      this.cartItems[itemIndex] = {
        ...this.cartItems[itemIndex],
        quantity: updateHandler.call(this, this.cartItems[itemIndex].quantity),
      };
    }
  }
}