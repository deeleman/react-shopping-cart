import React from 'react';
import './SummaryItems.scss';

interface SummaryItemsProps {
  quantity?: number;
  subTotal?: number;
}

export const SummaryItems: React.FunctionComponent<SummaryItemsProps> = ({ quantity, subTotal }) => (
  <ul className="summary-items wrapper border">
    <li>
      <span className="summary-items-number">{quantity} Items</span>
      <span className="summary-items-price" data-testid="price">
        {subTotal}<span className="currency">€</span>
      </span>
    </li>
  </ul>
);

SummaryItems.defaultProps = { quantity: 0, subTotal: 0 };
