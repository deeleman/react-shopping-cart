import React from 'react';
import './SummaryTotal.scss';

interface SummaryTotalProps {
  total?: number;
  isLoading: boolean;
}

export const SummaryTotal: React.FunctionComponent<SummaryTotalProps> = ({ total, isLoading}) => (
  <div className="summary-total wrapper">
    <ul>
      <li>
        <span className="summary-total-cost">Total cost</span>
        <span className="summary-total-price">{total} €</span>
      </li>
    </ul>
    <button role="button" type="submit" disabled={isLoading}>Checkout</button>
  </div>
);

SummaryTotal.defaultProps = { total: 0 };
