import '@testing-library/jest-dom';
import { render, fireEvent, screen } from '@testing-library/react';
import React from 'react';
import { CatalogueItem } from 'shopping-cart/types';
import { ProductsList } from '../ProductsList';

jest.mock('./../../../../img/items');

describe('ProductsList', () => {
  const scanHandlerStub = jest.fn();
  const removeHandlerStub = jest.fn();
  const selectHandlerStub = jest.fn();
  const cartItemsMock: CatalogueItem[] = [
    { id: 'X7R2OPX', name: 'React T-Shirt', price: 20.00, quantity: 2 },
    { id: 'X2G2OPZ', name: 'React Coffee Mug', price: 5.00, quantity: 1 },
    { id: 'X3W2OPY', name: 'React Cap', price: 10.00, quantity: 3 },
  ];

  beforeEach(() => render(
    <ProductsList items={cartItemsMock} scan={scanHandlerStub} remove={removeHandlerStub} select={selectHandlerStub} />
  ));

  it('should display an itemized tabular list of products', () => {
    expect(screen.getAllByRole('listitem')).toHaveLength(3);
  });

  it('should display unit price for each product item', () => {
    expect(screen.queryAllByLabelText('price')[0].textContent).toEqual('20€');
    expect(screen.queryAllByLabelText('price')[1].textContent).toEqual('5€');
    expect(screen.queryAllByLabelText('price')[2].textContent).toEqual('10€');
  });

  it('should display total amount due for each product order row', () => {
    expect(screen.queryAllByLabelText('total')[0].textContent).toEqual('40€');
    expect(screen.queryAllByLabelText('total')[1].textContent).toEqual('5€');
    expect(screen.queryAllByLabelText('total')[2].textContent).toEqual('30€');
  });

  it('should propagate and trigger the scan event handler after a click on a child add button', () => {
    fireEvent.click(screen.queryAllByLabelText('add')[0]);
    expect(scanHandlerStub).toHaveBeenCalledWith('X7R2OPX');
    scanHandlerStub.mockClear();

    fireEvent.click(screen.queryAllByLabelText('add')[1]);
    expect(scanHandlerStub).toHaveBeenCalledWith('X2G2OPZ');
    scanHandlerStub.mockClear();

    fireEvent.click(screen.queryAllByLabelText('add')[2]);
    expect(scanHandlerStub).toHaveBeenCalledWith('X3W2OPY');
    scanHandlerStub.mockClear();
  });

  it('should propagate and trigger the scan event handler after a click on a child remove button', () => {
    fireEvent.click(screen.queryAllByLabelText('remove')[0]);
    expect(removeHandlerStub).toHaveBeenCalledWith('X7R2OPX');
    removeHandlerStub.mockClear();

    fireEvent.click(screen.queryAllByLabelText('remove')[1]);
    expect(removeHandlerStub).toHaveBeenCalledWith('X2G2OPZ');
    removeHandlerStub.mockClear();

    fireEvent.click(screen.queryAllByLabelText('remove')[2]);
    expect(removeHandlerStub).toHaveBeenCalledWith('X3W2OPY');
    removeHandlerStub.mockClear();
  });

  it('should trigger the scan event handler adding units in the payload if populated manually', () => {
    fireEvent.change(screen.queryAllByLabelText('product-quantity')[0], { target: { value: 56 }});
    expect(scanHandlerStub).toHaveBeenCalledWith('X7R2OPX', 56);
    scanHandlerStub.mockClear();

    fireEvent.change(screen.queryAllByLabelText('product-quantity')[1], { target: { value: 12 }});
    expect(scanHandlerStub).toHaveBeenCalledWith('X2G2OPZ', 12);
    scanHandlerStub.mockClear();

    fireEvent.change(screen.queryAllByLabelText('product-quantity')[2], { target: { value: 0 }});
    expect(scanHandlerStub).toHaveBeenCalledWith('X3W2OPY', 0);
    scanHandlerStub.mockClear();
  });

  it('should trigger the select event handler when clicking on the product name or thumbnail', () => {
    fireEvent.click(screen.getByText('React Cap'));
    expect(selectHandlerStub).toHaveBeenCalledWith(cartItemsMock[2]); // Cap cart item
    selectHandlerStub.mockClear();

    fireEvent.click(screen.getAllByRole('img')[1]);
    expect(selectHandlerStub).toHaveBeenCalledWith(cartItemsMock[1]);  // Mug cart item
    selectHandlerStub.mockClear();
  });
});
