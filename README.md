**Besides providing exceptional transportation services, Cabify also runs a physical store which sells (only) 3 products:**

![Example image](./example.png?raw=true)

The current prices of the products are the following:
```
Code         | Name                |  Price
-------------------------------------------------
CAP          | Cabify Cap          |   5.00€
TSHIRT       | Cabify T-Shirt      |  20.00€
MUG          | Cafify Coffee Mug   |   7.50€
```

And we are offering users these discounts:
 * 2-for-1 promotions: buy two of the same product, get one free, applied to `CAP` items.
 * bulk discounts: buying 3 or more of `TSHIRT` product, the price of that product is reduced 5%. P.eg. if you buy 3 or more `TSHIRT` items, the price per unit should be 19.00€.

Our top UI engineer has already made an initial implementation of the store with vanilla html and css, but it lacks the implementation.

**Using the framework/library of your choice you have to:**
- Implement the cart logic with the following **requisites**:
  - Have a Checkout class, that **can** be instantiated with products and discounts available.
  - Allow adding products to the checkout with the `scan` method, passing the product ID as `string` in his first argument.
  - Allow calculating the total price with the `total` method, which won't accept any arguments and will return the total price (discount already applied) as `number`.
    Example of how it would work:
    ```javascript
      const co = new Checkout(pricingRules);
      co.scan("TSHIRT").scan("CAP").scan("TSHIRT");
      const totalPrice = co.total();
    ```
  - Add any extra method you may need to fulfill UI requirements

- Properly decompose the markup in components or whatever it suits you better to make it a production ready App.

- Add the presentation logic to update "Order summary" subsection whenever a product is added or removed.
You should use the `Checkout` class to get the total and discounts


**Take into account the following aspects:**
- Have notes attached, explaining the solution and why certain things are included and others are left out.
- Deliver production ready code.
- Provide a solution that could be easy to grow and easy to add new functionality.
- You can add any UX / UI improvements you consider, but we are going to focus on the requested features.
We value succinctness.
- When in doubt, act as a product owner
- [BONUS]: our UI engineer hadn't time either to work on the product details modal which you can see in the `/bonus` folder. It would be a plus if you could implement it.
