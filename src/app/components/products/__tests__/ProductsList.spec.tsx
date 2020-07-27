import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import { CartItem, ItemCode } from 'shopping-cart/types';
import { ProductsList } from '../ProductsList';

jest.mock('./../../../../img');

describe('ProductsList', () => {
  const scanHandlerStub = jest.fn();
  const removeHandlerStub = jest.fn();
  const cartItems: CartItem[] = [
    { id: 'X7R2OPX', code: ItemCode.TShirt, name: 'Cabify T-Shirt', shortName: 'Shirt', price: 20.00, quantity: 2 },
    { id: 'X2G2OPZ', code: ItemCode.Mug, name: 'Cabify Coffee Mug', shortName: 'Mug', price: 5.00, quantity: 1 },
    { id: 'X3W2OPY', code: ItemCode.Cap, name: 'Cabify Cap', shortName: 'Cap', price: 10.00, quantity: 3 },
  ];

  const setupTest = (items = cartItems) => render(
    <ProductsList items={items} scan={scanHandlerStub} remove={removeHandlerStub} />
  );

  it('should display an itemized tabular list of products', () => {
    const { getAllByRole } = setupTest();
    expect(getAllByRole('listitem')).toHaveLength(3);
  });

  it('should display unit price for each product item', () => {
    const { queryAllByLabelText } = setupTest();
    expect(queryAllByLabelText('price')[0].textContent).toEqual('20€');
    expect(queryAllByLabelText('price')[1].textContent).toEqual('5€');
    expect(queryAllByLabelText('price')[2].textContent).toEqual('10€');
  });

  it('should display total amount due for each product order row', () => {
    const { queryAllByLabelText } = setupTest();
    expect(queryAllByLabelText('total')[0].textContent).toEqual('40€');
    expect(queryAllByLabelText('total')[1].textContent).toEqual('5€');
    expect(queryAllByLabelText('total')[2].textContent).toEqual('30€');
  });

  it('should propagate and trigger the scan event handler after a click on a child add button', () => {
    const { queryAllByLabelText } = setupTest();

    fireEvent.click(queryAllByLabelText('add')[0]);
    expect(scanHandlerStub).toHaveBeenCalledWith(ItemCode.TShirt);
    scanHandlerStub.mockClear();

    fireEvent.click(queryAllByLabelText('add')[1]);
    expect(scanHandlerStub).toHaveBeenCalledWith(ItemCode.Mug);
    scanHandlerStub.mockClear();

    fireEvent.click(queryAllByLabelText('add')[2]);
    expect(scanHandlerStub).toHaveBeenCalledWith(ItemCode.Cap);
    scanHandlerStub.mockClear();
  });

  it('should propagate and trigger the scan event handler after a click on a child remove button', () => {
    const { queryAllByLabelText } = setupTest();

    fireEvent.click(queryAllByLabelText('remove')[0]);
    expect(removeHandlerStub).toHaveBeenCalledWith(ItemCode.TShirt);
    removeHandlerStub.mockClear();

    fireEvent.click(queryAllByLabelText('remove')[1]);
    expect(removeHandlerStub).toHaveBeenCalledWith(ItemCode.Mug);
    removeHandlerStub.mockClear();

    fireEvent.click(queryAllByLabelText('remove')[2]);
    expect(removeHandlerStub).toHaveBeenCalledWith(ItemCode.Cap);
    removeHandlerStub.mockClear();
  });

  it('should trigger the scan event handler adding units in the payload if populated manually', () => {
    const { queryAllByLabelText } = setupTest();

    fireEvent.change(queryAllByLabelText('product-quantity')[0], { target: { value: 56 }});
    expect(scanHandlerStub).toHaveBeenCalledWith(ItemCode.TShirt, 56);
    scanHandlerStub.mockClear();

    fireEvent.change(queryAllByLabelText('product-quantity')[1], { target: { value: 12 }});
    expect(scanHandlerStub).toHaveBeenCalledWith(ItemCode.Mug, 12);
    scanHandlerStub.mockClear();

    fireEvent.change(queryAllByLabelText('product-quantity')[2], { target: { value: 0 }});
    expect(scanHandlerStub).toHaveBeenCalledWith(ItemCode.Cap, 0);
    scanHandlerStub.mockClear();
  });

});

