import React from 'react';
import { DiscountItem } from 'shopping-cart/types';

interface SummaryDiscountsProps {
  items: DiscountItem[];
}

export const SummaryDiscounts: React.FunctionComponent<SummaryDiscountsProps> = ({ items }) => {
  const noDiscounts = (<li><span>No discounts applicable</span></li>);
  const discountsItems = items.map((item, index) => (
    <li key={index}><span>{item.name}</span><span>-{item.subTotal}€</span></li>
  ));

  return (
    <div className="summary-discounts wrapper-half border">
      <h2>Discounts</h2>
      <ul>
        { items && items.length > 0 ? discountsItems : noDiscounts }
      </ul>
    </div>
  );
};