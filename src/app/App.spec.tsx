import '@testing-library/jest-dom';
import { render, fireEvent, screen } from '@testing-library/react';
import React from 'react';
import { PricingSettings } from 'shopping-cart/types';
import { App } from '../App';

jest.mock('./../img/items');
jest.mock('./services/data-service');

describe('App smoke tests', () => {
  const settingsMock: PricingSettings = {
    items:          'https://test.dev/api/v1/items',
    discountRules:  'https://test.dev/api/v1/discounts',
  };

  beforeEach(() => render(<App settings={settingsMock} />));

  it('should render product items once fetched', async () => {
    await screen.findAllByLabelText('product-name');
    expect(screen.getAllByLabelText('product-name')).toHaveLength(3);
  });

  it('should increase product quantities upon clicking on the PLUS symbol', async () => {
    const addButtons = await screen.findAllByLabelText('add');
    fireEvent.click(addButtons[0]); // Shirt [+] button
    fireEvent.click(addButtons[0]);
    fireEvent.click(addButtons[0]);
    expect(screen.queryAllByLabelText('product-quantity')[0]).toHaveValue(3);
    expect(screen.getByText('x3 Shirt offer')).toBeInTheDocument();
    expect(screen.getByText('3 Items')).toBeInTheDocument();
    expect(screen.getByText('-3 €')).toBeInTheDocument();
    expect(screen.getByText('57 €')).toBeInTheDocument();
  });

  it('should decrease product quantities upon clicking on the MINUS symbol', async () => {
    const addButtons = await screen.findAllByLabelText('add');
    fireEvent.click(addButtons[1]); // Mug [+] button
    fireEvent.click(addButtons[1]);
    fireEvent.click(addButtons[1]);
    fireEvent.click(addButtons[1]);
    fireEvent.click(screen.getAllByLabelText('remove')[1]);
    expect(screen.queryAllByLabelText('product-quantity')[1]).toHaveValue(3);
    expect(screen.getByText('2x1 Mug offer')).toBeInTheDocument();
    expect(screen.getByText('3 Items')).toBeInTheDocument();
    expect(screen.getByText('-5 €')).toBeInTheDocument();
    expect(screen.getByText('10 €')).toBeInTheDocument();
  });

  it('should update product quantities upon changing input manually', async () => {
    await screen.findAllByLabelText('product-name');
    const mugQuantityInput = screen.queryAllByLabelText('product-quantity')[1];
    fireEvent.change(mugQuantityInput, { target: { value: 11 }}); // Mug qty input
    expect(mugQuantityInput).toHaveValue(11);
  });

  it('should enable the product modal upon clicking on the product item', async () => {
    const thumbs = await screen.findAllByRole('img');
    expect(screen.queryByRole('dialog')).toBeNull();

    fireEvent.click(thumbs[1]);
    expect(screen.queryByRole('dialog')).not.toBeNull();
  });
});
