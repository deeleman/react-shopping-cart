import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React from 'react';
import { Product } from '../Product';

jest.mock('./../../../../img');

describe('Product', () => {
  const setupTest = (shortName = 'Mug', code = 'X2G2OPZ') => {
    const { getByLabelText, getByRole } = render(<Product shortName={shortName} code={code} />);
    return { getByLabelText, getByRole };
  }

  it('should display the product short name supplied', () => {
    const { getByLabelText } = setupTest();
    expect(getByLabelText('product-name').textContent).toEqual('Mug'); 
  });

  it('should display the product code supplied', () => {
    const { getByLabelText } = setupTest();
    expect(getByLabelText('product-code').textContent).toEqual('Product code X2G2OPZ'); 
  });

  it('should display an image whose alt attribute is the short name', () => {
    const { getByRole } = setupTest();
    expect(getByRole('img').getAttribute('alt')).toEqual('Mug'); 
  });
  
  it('should display an image depicting the product thumbnail', () => {
    const { getByRole } = setupTest();
    expect(getByRole('img').getAttribute('src')).toEqual('mug.png'); 
  });
  
  it('should display a fallback image if the product has not thumbnail matching its code', () => {
    const { getByRole } = setupTest('Foo');
    expect(getByRole('img').getAttribute('src')).toEqual('fallback.png'); 
  });
});
