import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { Summary } from '../Summary';

describe('Summary', () => {
  test('should render any children element projected', () => {
    render(<Summary><p data-testid="child-element">Mock children element</p></Summary>);

    expect(screen.getByTestId('child-element')).toBeInTheDocument();
    expect(screen.getByTestId('child-element').textContent).toEqual('Mock children element');
  });
});

