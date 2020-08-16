import React from 'react';
import { images } from './../../../img/items';
import './Product.scss';

interface ProductProps {
  name: string;
  code: string;
  select: () => void;
}

const sanitizeName = (name: string) => name.split(' ').pop()?.replace('-', '').toLowerCase();
const image = (name: string) => images[sanitizeName(name)] || images['fallback'];

export const Product: React.FunctionComponent<ProductProps> = ({ name, code, select }) => {
  return (
    <figure className="product-image">
      <a onClick={select}>
        <img role="img" src={image(name)} alt={name} />
      </a>
      <div className="product-description">
        <h3 className="product-name" aria-label="product-name">
          <a onClick={select}>{name}</a>
        </h3>
        <p aria-label="product-code" className="product-code"><span>Product code</span> {code}</p>
      </div>
    </figure>
  );
};
