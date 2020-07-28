import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { Products } from '../Products';

describe('Products', () => {
  const setupTest = (isLoading = false) => render(
    <Products isLoading={isLoading}><div data-testid="child-element">Mock children element</div></Products>
  );

  it('should display a products loader when the component is loading', () => {
    setupTest(true);
    expect(screen.getByRole('main').textContent).toContain('Loading'); 
  });

  it('should display a products loader when the component is loading', () => {
    setupTest(false);
    expect(screen.getByRole('main').textContent).toContain('Shopping cart'); 
    expect(screen.getByRole('heading')).toBeInTheDocument();
  });

  it('should NOT render projected children elements if onloading', () => {
    setupTest(true);
    expect(screen.queryByText('Mock children element')).not.toBeInTheDocument();
  });

  it('should render projected children elements if NOT onloading', () => {
    setupTest(false);
    expect(screen.getByTestId('child-element')).toBeInTheDocument();
    expect(screen.getByTestId('child-element').textContent).toEqual('Mock children element');
  });
});
