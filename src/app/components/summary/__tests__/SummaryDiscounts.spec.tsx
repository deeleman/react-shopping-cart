import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { DiscountType, ItemCode } from 'shopping-cart/types';
import { SummaryDiscounts } from '../SummaryDiscounts';

describe('SummaryDiscounts', () => {
  const mugDiscount = { type: DiscountType['2x1'], itemCode: ItemCode.Mug, name: '2x1 Mug offer', subTotal: 10 };
  const bulkShirtDiscount = { type: DiscountType.Bulk, itemCode: ItemCode.TShirt, name: 'x3 Shirt offer', subTotal: 4 };

  test('should display a "No discounts..." fallback text if no items are provided', () => {
    render(<SummaryDiscounts />);
    expect(screen.getByText('No discounts applicable')).toBeInTheDocument();
  });

  test('should display a "No discounts..." fallback text if discounts provided are empty', () => {
    render(<SummaryDiscounts items={[]} />);
    expect(screen.getByText('No discounts applicable')).toBeInTheDocument();
  });

  test('should display an itemized list matching discounts provided', async () => {
    render(<SummaryDiscounts items={[mugDiscount, bulkShirtDiscount]} />);
    const items = await screen.findAllByText(/offer/i);

    expect(items).toHaveLength(2);

    expect(screen.getByText('-10€')).toBeInTheDocument();
    expect(screen.getByText('-4€')).toBeInTheDocument();
  });
});

