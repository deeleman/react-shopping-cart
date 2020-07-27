import React from 'react';
import { DiscountItem } from 'shopping-cart/types';

interface SummaryDiscountsProps {
  items?: DiscountItem[];
}

export const SummaryDiscounts: React.FunctionComponent<SummaryDiscountsProps> = ({ items }) => {
  const noDiscounts = (<li role="listitem"><span>No discounts applicable</span></li>);
  const discountsItems = items!.map((item, index) => (
    <li key={index} role="listitem">
      <span>{item.name}</span>
      <span>-{item.subTotal}€</span>
    </li>
  ));

  return (
    <div className="summary-discounts wrapper-half border">
      <h2>Discounts</h2>
      <ul role="list">
        { items!.length > 0 ? discountsItems : noDiscounts }
      </ul>
    </div>
  );
};

SummaryDiscounts.defaultProps = { items: [] };
