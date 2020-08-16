import '@testing-library/jest-dom';
import { render, fireEvent, screen, cleanup } from '@testing-library/react';
import React from 'react';
import { ProductModal } from '../ProductModal';
import { Item } from 'shopping-cart/types';

jest.mock('./../../../../img/items');

describe('ProductModal', () => {
  const scanHandlerStub = jest.fn();
  const closeHandlerStub = jest.fn();
  const cartItemMock: Item = { id: 'X7R2OPX', name: 'React T-Shirt', price: 20.00 };

  const setupTest = (cartItem?: Item) => render(
    <ProductModal
      item={cartItem}
      scan={scanHandlerStub}
      close={closeHandlerStub}
    />
  );

  afterEach(() => jest.resetAllMocks());

  it('should display the product name', () => {
    setupTest(cartItemMock);
    expect(screen.getByText('React T-Shirt')).toBeInTheDocument();
  });

  it('should display the product price', () => {
    setupTest(cartItemMock);
    expect(screen.getByText('20 €')).toBeInTheDocument();
  });

  it('should display the product code', () => {
    setupTest(cartItemMock);
    expect(screen.getByText('Product code X7R2OPX')).toBeInTheDocument();
  });

  it('should display the product image in large format', () => {
    setupTest(cartItemMock);
    expect(screen.getByRole('img').getAttribute('style')).toContain('tshirtLarge.png'); 
  });

  it('should display a fallback image if the product has not thumbnail matching its code', () => {
    cleanup();
    const cartItemFakeMock = { ...cartItemMock, name: 'React Underwear' };
    render(<ProductModal item={cartItemFakeMock} scan={scanHandlerStub} close={closeHandlerStub} />);
    expect(screen.getByRole('img').getAttribute('style')).toContain('fallbackLarge.png'); 
  });

  it('should call the scan handler upon clicking on the add to cart button and then trigger the close event', () => {
    setupTest(cartItemMock);
    fireEvent.click(screen.getAllByRole('button')[0]);
    expect(scanHandlerStub).toHaveBeenCalledWith(cartItemMock.id);
    expect(closeHandlerStub).toHaveBeenCalled();
  });
  
  it('should trigger the close event upon clicking on the X icon', () => {
    setupTest(cartItemMock);
    fireEvent.click(screen.getAllByRole('button')[1]);
    expect(scanHandlerStub).not.toHaveBeenCalled();
    expect(closeHandlerStub).toHaveBeenCalled();
  });

  it('should not display the product modal if the input item is not set', () => {
    cleanup();
    render(
      <ProductModal
        scan={scanHandlerStub}
        close={closeHandlerStub}
      />
    );
    expect(screen.queryByRole('dialog')).toBeNull();
  });

});
