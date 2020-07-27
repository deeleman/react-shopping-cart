import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { SummaryItems } from '../SummaryItems';


describe('SummaryItems', () => {
  test('should display 0 items in the cart if not input is provided', () => {
    render(<SummaryItems />);
    expect(screen.getByText('0 Items')).toBeInTheDocument();
  });

  test('should display a 0€ sub total if not input is provided', () => {
    render(<SummaryItems />);
    expect(screen.getByTestId('price').textContent).toContain('0€');
  });

  test('should display the amount of items in the cart', () => {
    render(<SummaryItems subTotal={234.56} quantity={5} />);
    expect(screen.getByText('5 Items')).toBeInTheDocument();
  });

  test('should display the gross sub total items in the cart', () => {
    render(<SummaryItems subTotal={234.56} quantity={5} />);
    expect(screen.getByTestId('price').textContent).toEqual('234.56€');
  });
});
