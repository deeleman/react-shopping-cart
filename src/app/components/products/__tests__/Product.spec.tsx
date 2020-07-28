import '@testing-library/jest-dom';
import { render, screen, cleanup } from '@testing-library/react';
import React from 'react';
import { Product } from '../Product';

jest.mock('./../../../../img');

describe('Product', () => {
  beforeEach(() => render(<Product shortName={'Mug'} code={'X2G2OPZ'} />));

  it('should display the product short name supplied', () => {
    expect(screen.getByLabelText('product-name').textContent).toEqual('Mug'); 
  });

  it('should display the product code supplied', () => {
    expect(screen.getByLabelText('product-code').textContent).toEqual('Product code X2G2OPZ'); 
  });

  it('should display an image whose alt attribute is the short name', () => {
    expect(screen.getByRole('img').getAttribute('alt')).toEqual('Mug'); 
  });
  
  it('should display an image depicting the product thumbnail', () => {
    expect(screen.getByRole('img').getAttribute('src')).toEqual('mug.png'); 
  });
  
  it('should display a fallback image if the product has not thumbnail matching its code', () => {
    cleanup();
    const { getByRole } = render(<Product shortName={'Foo'} code={'X2G2OPZ'} />)
    expect(getByRole('img').getAttribute('src')).toEqual('fallback.png'); 
  });
});
