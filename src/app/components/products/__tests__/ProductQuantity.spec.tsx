import '@testing-library/jest-dom';
import { render, fireEvent, screen } from '@testing-library/react';
import React from 'react';
import { ProductQuantity } from '../ProductQuantity';

describe('ProductQuantity', () => {
  const addHandlerStub = jest.fn();
  const removeHandlerStub = jest.fn();
  const editHandlerStub = jest.fn();

  const setupTest = (quantity: number = 0) => render(
    <ProductQuantity
      quantity={quantity}
      add={addHandlerStub}
      remove={removeHandlerStub}
      edit={editHandlerStub}
    />
  );

  afterEach(() => jest.resetAllMocks());

  it('should display the amount of items in the quantity input field', () => {
    setupTest(52);
    expect(screen.getByLabelText('product-quantity').getAttribute('value')).toEqual('52')
  });

  it('should display 0 items by default when no quantity is supplied', () => {
    setupTest(0);
    expect(screen.getByLabelText('product-quantity').getAttribute('value')).toEqual('0');
  });

  it('should call the add handler when the "+" button is clicked', () => {
    setupTest();
    fireEvent.click(screen.getByLabelText('add'));
    expect(addHandlerStub).toHaveBeenCalled();
  });

  it('should call the remove handler when the "-" button is clicked', () => {
    setupTest();
    fireEvent.click(screen.getByLabelText('remove'));
    expect(removeHandlerStub).toHaveBeenCalled();
  });

  it('should call the edit handler when a value is entered by hand', () => {
    setupTest();
    fireEvent.change(screen.getByLabelText('product-quantity'), { target: { value: 56 }});
    expect(editHandlerStub).toHaveBeenCalledWith(56);
  });
});
