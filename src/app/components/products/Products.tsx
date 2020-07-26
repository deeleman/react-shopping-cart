import React from 'react';

export const Products: React.FunctionComponent = (props) => (
  <section className="products">
    <h1 className="main">Shopping cart</h1>
    <ul className="products-list tableHead">
      <li className="products-list-title row">
        <div className="col-product">Product details</div>
        <div className="col-quantity">Quantity</div>
        <div className="col-price">Price</div>
        <div className="col-total">Total</div>
      </li>
    </ul>
    {props.children}
  </section>
);