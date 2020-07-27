import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React from 'react';
import { DiscountType, ItemCode } from 'shopping-cart/types';
import { SummaryDiscounts } from '../SummaryDiscounts';

describe('SummaryDiscounts', () => {
  const mugDiscountMock = { type: DiscountType['2x1'], itemCode: ItemCode.Mug, name: '2x1 Mug offer', subTotal: 10 };
  const bulkShirtDiscountMock = { type: DiscountType.Bulk, itemCode: ItemCode.TShirt, name: 'x3 Shirt offer', subTotal: 4 };

  it('should display a "No discounts..." fallback text if no items are provided', () => {
    const { getByText } = render(<SummaryDiscounts />);
    expect(getByText('No discounts applicable')).toBeInTheDocument();
  });

  it('should display a "No discounts..." fallback text if discounts provided are empty', () => {
    const { getByText } = render(<SummaryDiscounts items={[]} />);
    expect(getByText('No discounts applicable')).toBeInTheDocument();
  });

  it('should display an itemized list matching discounts provided', async () => {
    const discountItemsMock = [mugDiscountMock, bulkShirtDiscountMock];
    const { getByText, findAllByText } = render(<SummaryDiscounts items={discountItemsMock} />);
    const items = await findAllByText(/offer/i);

    expect(items).toHaveLength(2);
    expect(getByText('-10€')).toBeInTheDocument();
    expect(getByText('-4€')).toBeInTheDocument();
  });
});

