import React from 'react';
import capImage from './../../../img/cap.png';
import mugImage from './../../../img/mug.png';
import shirtImage from './../../../img/shirt.png';

export const ProductsList: React.FunctionComponent = () => (
  <ul className="products-list">
    <li className="product row">
      <div className="col-product">
        <figure className="product-image">
          <img src={shirtImage} alt="Shirt" />
          <div className="product-description">
            <h1>Shirt</h1>
            <p className="product-code">Product code X7R2OPX</p>
          </div>
        </figure>
      </div>
      <div className="col-quantity">
        <button className="count">-</button>
        <input type="text" className="product-quantity" value="3" />
        <button className="count">+</button>
      </div>
      <div className="col-price">
        <span className="product-price">20</span
        ><span className="product-currency currency">€</span>
      </div>
      <div className="col-total">
        <span className="product-price">60</span
        ><span className="product-currency currency">€</span>
      </div>
    </li>
    <li className="product row">
      <div className="col-product">
        <figure className="product-image">
          <img src={mugImage} alt="Mug" />
          <div className="product-description">
            <h1>Mug</h1>
            <p className="product-code">Product code X2G2OPZ</p>
          </div>
        </figure>
      </div>
      <div className="col-quantity">
        <button className="count">-</button
        ><input type="text" className="product-quantity" value="4" /><button
          className="count"
        >
          +
        </button>
      </div>
      <div className="col-price">
        <span className="product-price">5</span
        ><span className="product-currency currency">€</span>
      </div>
      <div className="col-total">
        <span className="product-price">20</span
        ><span className="product-currency currency">€</span>
      </div>
    </li>
    <li className="product row">
      <div className="col-product">
        <figure className="product-image">
          <img src={capImage} alt="Cap" />
          <div className="product-description">
            <h1>Cap</h1>
            <p className="product-code">Product code X3W2OPY</p>
          </div>
        </figure>
      </div>
      <div className="col-quantity">
        <button className="count">-</button
        ><input type="text" className="product-quantity" value="4" /><button
          className="count"
        >
          +
        </button>
      </div>
      <div className="col-price">
        <span className="product-price">10</span
        ><span className="product-currency currency">€</span>
      </div>
      <div className="col-total">
        <span className="product-price">40</span
        ><span className="product-currency currency">€</span>
      </div>
    </li>
  </ul>
);
