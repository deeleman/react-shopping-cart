import React from 'react';
import { images } from './../../../img';

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
        <h1 aria-label="product-name">{shortName}</h1>
        <p aria-label="product-code" className="product-code">Product code {code}</p>
      </div>
    </figure>
  );
};
