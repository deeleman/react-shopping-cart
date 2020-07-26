import React from 'react';

interface SummaryItemsProps {
  quantity: number;
  subTotal: number;
}

export const SummaryItems: React.FunctionComponent<SummaryItemsProps> = (props) => (
  <ul className="summary-items wrapper border">
    <li>
      <span className="summary-items-number">{props.quantity} Items</span>
      <span className="summary-items-price">
        {props.subTotal}<span className="currency">€</span>
      </span>
    </li>
  </ul>
);