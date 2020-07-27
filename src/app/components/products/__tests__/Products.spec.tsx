import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { Products } from '../Products';

describe('Products', () => {
  const setupTest = (isLoading = false) => {
    const { getByText, getByRole, getByTestId, queryByText } = render(
      <Products isLoading={isLoading}><div data-testid="child-element">Mock children element</div></Products>
    );
    return { getByText, getByRole, getByTestId };
  }

  it('should display a products loader when the component is loading', () => {
    const { getByRole } = setupTest(true);
    expect(getByRole('main').textContent).toContain('Loading'); 
  });

  it('should display a products loader when the component is loading', () => {
    const { getByRole } = setupTest(false);
    expect(getByRole('main').textContent).toContain('Shopping cart'); 
    expect(getByRole('heading')).toBeInTheDocument();
  });

  it('should NOT render projected children elements if onloading', () => {
    setupTest(true);
    expect(screen.queryByText('Mock children element')).not.toBeInTheDocument();
  });

  it('should render projected children elements if NOT onloading', () => {
    const { getByTestId } = setupTest(false);
    expect(getByTestId('child-element')).toBeInTheDocument();
    expect(getByTestId('child-element').textContent).toEqual('Mock children element');
  });
});
