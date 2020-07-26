import React from 'react';

export const SummaryItems: React.FunctionComponent = (props) => (
  <ul className="summary-items wrapper border">
    <li>
      <span className="summary-items-number">11 Items</span>
      <span className="summary-items-price">
        120<span className="currency">€</span>
      </span>
    </li>
  </ul>
);