import React from 'react';
import './App.scss';
import { Products, ProductsList } from './products';
import { Summary, SummaryItems, SummaryDiscounts, SummaryTotal } from './summary';

export const App: React.FunctionComponent = () => {
  
  return (
    <main className="App">
      <Products>
        <ProductsList />
      </Products>
      <Summary>
        <SummaryItems />
        <SummaryDiscounts />
        <SummaryTotal />
      </Summary>
    </main>
  );
};
