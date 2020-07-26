import React from 'react';

export const SummaryDiscounts: React.FunctionComponent = (props) => (
  <div className="summary-discounts wrapper-half border">
    <h2>Discounts</h2>
    <ul>
      <li><span>2x1 Mug offer</span><span>-10€</span></li>
      <li><span>x3 Shirt offer</span><span>-3€</span></li>
      <li><span>Promo code</span><span>0€</span></li>
    </ul>
  </div>
);