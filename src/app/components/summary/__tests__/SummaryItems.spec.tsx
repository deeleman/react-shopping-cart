import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { SummaryItems } from '../SummaryItems';

describe('SummaryItems', () => {
  it('should display the amount of items in the cart', () => {
    render(<SummaryItems subTotal={234.56} quantity={5} />);
    expect(screen.getByText('5 Items')).toBeInTheDocument();
  });

  it('should display 0 items in the cart if not input is provided', () => {
    render(<SummaryItems />);
    expect(screen.getByText('0 Items')).toBeInTheDocument();
  });

  it('should display a 0€ sub total if not input is provided', () => {
    render(<SummaryItems />);
    expect(screen.getByTestId('price').textContent).toContain('0€');
  });

  it('should display the gross sub total items in the cart', () => {
    render(<SummaryItems subTotal={234.56} quantity={5} />);
    expect(screen.getByTestId('price').textContent).toEqual('234.56€');
  });
});
