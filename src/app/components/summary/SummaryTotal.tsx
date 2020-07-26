import React from 'react';

interface SummaryTotalProps {
  total: number;
  isLoading: boolean;
}

export const SummaryTotal: React.FunctionComponent<SummaryTotalProps> = ({ total, isLoading}) => (
  <div className="summary-total wrapper">
    <ul>
      <li>
        <span className="summary-total-cost">Total cost</span>
        <span className="summary-total-price">{total}€</span>
      </li>
    </ul>
    <button type="submit" disabled={isLoading}>Checkout</button>
  </div>
);