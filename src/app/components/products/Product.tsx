import React from 'react';
import images from './../../../img/*.png';

interface ProductProps {
  shortName: string;
  code: string;
}

export const Product: React.FunctionComponent<ProductProps> = ({ shortName, code }) => (
  <figure className="product-image">
    <img src={images[shortName.toLowerCase()]} alt={shortName} />
    <div className="product-description">
      <h1>{shortName}</h1>
      <p className="product-code">Product code {code}</p>
    </div>
  </figure>
);
