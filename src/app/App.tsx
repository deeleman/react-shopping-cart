import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.scss';
import { ProductModal, Products, ProductsList, Summary, SummaryDiscounts, SummaryItems, SummaryTotal } from './components';
import { 
  add,
  fetchItems,
  remove,
  selectCartItems,
  selectCartItemsAmount,
  selectCartSubtotal,
  selectCartTotal,
  selectDiscountItems,
  selectIsLoading } from './store';
import { Item, PricingSettings } from './types';

interface AppProps {
  settings: PricingSettings;
}

export const App: React.FunctionComponent<AppProps> = ({ settings }) => {
  const dispatch = useDispatch();

  const isLoading = useSelector(selectIsLoading);
  const cartItems = useSelector(selectCartItems);
  const cartItemsAmount = useSelector(selectCartItemsAmount);
  const discountItems = useSelector(selectDiscountItems);
  const cartSubtotal = useSelector(selectCartSubtotal);
  const cartTotal = useSelector(selectCartTotal);

  const [selectedItem, setSelectedItem] = useState<Item | undefined>(undefined);

  useEffect(() => {
    dispatch(fetchItems(settings));
  }, []);

  const addItem = (itemId: string, quantity?: number): void => {
    dispatch(add({ id: itemId, quantity }));
  }

  const removeItem = (itemId: string): void => {
    dispatch(remove(itemId));
  }

  const toggleModal = (item?: Item): void => {
    setSelectedItem(item);
  };

  return (
    <main className="App">
      <Products isLoading={isLoading}>
        <ProductsList items={cartItems} scan={addItem} remove={removeItem} select={toggleModal} />
        <ProductModal item={selectedItem} scan={addItem} close={toggleModal} />
      </Products>
      <Summary>
        <SummaryItems quantity={cartItemsAmount} subTotal={cartSubtotal} />
        <SummaryDiscounts items={discountItems} />
        <SummaryTotal isLoading={isLoading} total={cartTotal} />
      </Summary>
    </main>
  );
}
