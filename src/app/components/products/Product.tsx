import React from 'react';
import { images } from './../../../img/items';
import './Product.scss';

interface ProductProps {
  shortName: string;
  code: string;
  select: () => void;
}

export const Product: React.FunctionComponent<ProductProps> = ({ shortName, code, select }) => {
  const image = images[shortName.toLowerCase()] || images['fallback'];
  return (
    <figure className="product-image">
      <a onClick={select}>
        <img role="img" src={image} alt={shortName} />
      </a>
      <div className="product-description">
        <h3 className="product-name" aria-label="product-name">
          <a onClick={select}>{shortName}</a>
        </h3>
        <p aria-label="product-code" className="product-code"><span>Product code</span> {code}</p>
      </div>
    </figure>
  );
};
