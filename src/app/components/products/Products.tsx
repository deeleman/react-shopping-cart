import React from 'react';
import { ProductsLoader } from './ProductsLoader';
import './Products.scss';

interface ProductsProps {
  isLoading: boolean;
  children?: React.ReactNode;
}

export const Products: React.FunctionComponent<ProductsProps> = ({ isLoading, children }) => (
  <section className="products">
    {isLoading ? (
    <>
      <h1 role="main" className="main">Loading shopping cart, please wait...</h1>
      <ProductsLoader />
    </>
    ) : (
    <>
      <h1 role="main" className="main">React Swag Catalogue</h1>
      <ul role="heading" className="products-list tableHead">
        <li className="products-list-title row">
          <div className="col-product">Product details</div>
          <div className="col-quantity">Quantity</div>
          <div className="col-price">Price</div>
          <div className="col-total">Total</div>
        </li>
      </ul>
      {children}
    </>
    )}
  </section>
);