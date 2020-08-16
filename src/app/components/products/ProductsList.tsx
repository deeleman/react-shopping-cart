import React from 'react';
import { CatalogueItem } from 'shopping-cart/types';
import { Product } from './Product';
import { ProductQuantity } from './ProductQuantity';
import './ProductsList.scss';

interface ProductsListProps {
  items: CatalogueItem[];
  scan: (itemId: string, quantity?: number) => void;
  remove: (itemId: string) => void;
  select: (item: CatalogueItem) => void; 
}

export const ProductsList: React.FunctionComponent<ProductsListProps> = ({ items, scan, remove, select }) => {
  return (
    <ul className="products-list" role="list">
      { items.map((item) => (
        <li key={item.id} className="product row" role="listitem">
          <div className="col-product">
            <Product
              shortName={item.shortName}
              code={item.id}
              select={() => select(item)}
            />
          </div>
          <div className="col-quantity">
            <ProductQuantity
              quantity={item.quantity}
              add={() => scan(item.id)}
              remove={() => remove(item.id)}
              edit={(quantity) => scan(item.id, quantity)}
            />
          </div>
          <div className="col-price" aria-label="price">
            <span className="product-price">{item.price}</span>
            <span className="product-currency currency">€</span>
          </div>
          <div className="col-total" aria-label="total">
            <span className="product-price">{item.price * item.quantity}</span>
            <span className="product-currency currency">€</span>
          </div>
        </li>
      ))}
    </ul>
  );
};
