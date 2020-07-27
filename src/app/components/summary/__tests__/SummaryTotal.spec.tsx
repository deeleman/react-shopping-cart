import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { SummaryTotal } from '../SummaryTotal';

describe('SummaryTotal', () => {
  test('should display the amount of items in the cart', () => {
    render(<SummaryTotal total={365.47} isLoading={false} />);
    expect(screen.getByText('365.47€')).toBeInTheDocument();
  });

  test('should display 0€ as net total by default', () => {
    render(<SummaryTotal isLoading={false} />);
    expect(screen.getByText('0€')).toBeInTheDocument();
  });

  test('should disable its checkout button when the isLoading prop is truthy', () => {
    render(<SummaryTotal isLoading={true} />);
    expect(screen.getByText(/checkout/i).closest('button')).toBeDisabled();
  });
});

