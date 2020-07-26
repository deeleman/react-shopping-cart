import React from 'react';

export const SummaryTotal: React.FunctionComponent = (props) => (
  <div className="summary-total wrapper">
    <ul>
      <li>
        <span className="summary-total-cost">Total cost</span>
        <span className="summary-total-price">107€</span>
      </li>
    </ul>
    <button type="submit">Checkout</button>
  </div>
);