import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { DiscountType, ItemCode } from 'shopping-cart/types';
import { SummaryDiscounts } from '../SummaryDiscounts';

describe('SummaryDiscounts', () => {
  const mugDiscountMock = { type: DiscountType['2x1'], itemCode: ItemCode.Mug, name: '2x1 Mug offer', subTotal: 10 };
  const bulkShirtDiscountMock = { type: DiscountType.Bulk, itemCode: ItemCode.TShirt, name: 'x3 Shirt offer', subTotal: 4 };

  it('should display a "No discounts..." fallback text if no items are provided', () => {
    render(<SummaryDiscounts />);
    expect(screen.getByRole('listitem').textContent).toContain('No discounts applicable');
  });

  it('should display a "No discounts..." fallback text if discounts provided are empty', () => {
    render(<SummaryDiscounts items={[]} />);
    expect(screen.getByRole('listitem').textContent).toContain('No discounts applicable');
  });

  it('should display an itemized list matching discounts provided', () => {
    const discountItemsMock = [mugDiscountMock, bulkShirtDiscountMock];
    render(<SummaryDiscounts items={discountItemsMock} />);

    expect(screen.getAllByRole('listitem')).toHaveLength(2);
    expect(screen.getAllByRole('listitem')[0].textContent).toContain('-10 €');
    expect(screen.getAllByRole('listitem')[1].textContent).toContain('-4 €');
  });
});
