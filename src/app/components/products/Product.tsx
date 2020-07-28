import React from 'react';
import { images } from './../../../img/items';
import './Product.scss';

interface ProductProps {
  shortName: string;
  code: string;
}

export const Product: React.FunctionComponent<ProductProps> = ({ shortName, code }) => {
  const image = images[shortName.toLowerCase()] || images['fallback'];

  return (
    <figure className="product-image">
      <img role="img" src={image} alt={shortName} />
      <div className="product-description">
        <h3 className="product-name" aria-label="product-name">{shortName}</h3>
        <p aria-label="product-code" className="product-code">Product code {code}</p>
      </div>
    </figure>
  );
};
