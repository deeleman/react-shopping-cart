import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React from 'react';
import { SummaryItems } from '../SummaryItems';

describe('SummaryItems', () => {
  it('should display the amount of items in the cart', () => {
    const { getByText } = render(<SummaryItems subTotal={234.56} quantity={5} />);
    expect(getByText('5 Items')).toBeInTheDocument();
  });

  it('should display 0 items in the cart if not input is provided', () => {
    const { getByText } = render(<SummaryItems />);
    expect(getByText('0 Items')).toBeInTheDocument();
  });

  it('should display a 0€ sub total if not input is provided', () => {
    const { getByTestId } = render(<SummaryItems />);
    expect(getByTestId('price').textContent).toContain('0€');
  });

  it('should display the gross sub total items in the cart', () => {
    const { getByTestId } = render(<SummaryItems subTotal={234.56} quantity={5} />);
    expect(getByTestId('price').textContent).toEqual('234.56€');
  });
});
