import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React from 'react';
import { Summary } from '../Summary';

describe('Summary', () => {
  it('should render any children element projected', () => {
    const { getByTestId } = render(<Summary><p data-testid="child-element">Mock children element</p></Summary>);

    expect(getByTestId('child-element')).toBeInTheDocument();
    expect(getByTestId('child-element').textContent).toEqual('Mock children element');
  });
});

