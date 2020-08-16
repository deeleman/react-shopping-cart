import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { PricingSettings } from 'shopping-cart/types';
import { App } from './App';
import { store } from './store';

jest.mock('./../img/items');
jest.mock('./services/data-service');

describe('App integration tests', () => {
  const settingsMock: PricingSettings = {
    items:          'https://test.dev/api/v1/items',
    discountRules:  'https://test.dev/api/v1/discounts',
  };

  const renderApp = () => render(<Provider store={store}><App settings={settingsMock} /></Provider>);

  it('should render product items once fetched', async () => {
    const { findAllByLabelText, getAllByLabelText } = renderApp();
    await findAllByLabelText('product-name');
    expect(getAllByLabelText('product-name')).toHaveLength(4);
  });

  it('should increase and decrease product quantities upon clicking on the PLUS/MINUS symbol', async () => {
    const { findAllByLabelText, queryAllByLabelText, getByText, getAllByLabelText } = renderApp();
    const addButtons = await findAllByLabelText('add');
    fireEvent.click(addButtons[0]); // T-Shirt [+] button
    fireEvent.click(addButtons[0]);
    fireEvent.click(addButtons[0]);

    expect(queryAllByLabelText('product-quantity')[0]).toHaveValue(3);
    expect(getByText('x3 React T-Shirt offer')).toBeInTheDocument();
    expect(getByText('3 Items')).toBeInTheDocument();
    expect(getByText('-3 €')).toBeInTheDocument();
    expect(getByText('57 €')).toBeInTheDocument();

    fireEvent.click(addButtons[1]); // Mug [+] button
    fireEvent.click(addButtons[1]);
    fireEvent.click(addButtons[1]);
    fireEvent.click(addButtons[1]);
    fireEvent.click(getAllByLabelText('remove')[1]);

    expect(queryAllByLabelText('product-quantity')[1]).toHaveValue(3);
    expect(getByText('2x1 React Coffee Mug offer')).toBeInTheDocument();
    expect(getByText('6 Items')).toBeInTheDocument();
    expect(getByText('-5 €')).toBeInTheDocument();
    expect(getByText('67 €')).toBeInTheDocument();
  });

  it('should update product quantities upon changing input manually', async () => {
    const { findAllByLabelText, queryAllByLabelText } = renderApp();
    await findAllByLabelText('product-name');
    const mugQuantityInput = queryAllByLabelText('product-quantity')[1];
    fireEvent.change(mugQuantityInput, { target: { value: 11 }}); // Mug qty input
    expect(mugQuantityInput).toHaveValue(11);
  });

  it('should enable the product modal upon clicking on the product item', async () => {
    const { findAllByRole, queryByRole } = renderApp();
    const thumbs = await findAllByRole('img');
    expect(queryByRole('dialog')).toBeNull();

    fireEvent.click(thumbs[1]);
    expect(queryByRole('dialog')).not.toBeNull();
  });
});
