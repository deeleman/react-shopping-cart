import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React from 'react';
import { SummaryTotal } from '../SummaryTotal';

describe('SummaryTotal', () => {
  it('should display the amount of items in the cart', () => {
    const { getByText } = render(<SummaryTotal total={365.47} isLoading={false} />);
    expect(getByText('365.47€')).toBeInTheDocument();
  });

  it('should display 0€ as net total by default', () => {
    const { getByText } = render(<SummaryTotal isLoading={false} />);
    expect(getByText('0€')).toBeInTheDocument();
  });

  it('should disable its checkout button when the isLoading prop is truthy', () => {
    const { getByRole } = render(<SummaryTotal isLoading={true} />);
    expect(getByRole('button')).toBeDisabled();
  });
});

