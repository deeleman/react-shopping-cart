import React from 'react';
import './ProductQuantity.scss';

interface ProductQuantityProps {
  quantity?: number;
  add: () => void;
  remove: () => void;
  edit: (quantity: number) => void;
}

export const ProductQuantity: React.FunctionComponent<ProductQuantityProps> = ({ quantity, add, remove, edit }) => (
  <>
    <button aria-label="remove" className="count" onClick={() => remove()}>-</button>
    <input aria-label="product-quantity"
      type="number"
      className="product-quantity"
      value={quantity}
      onChange={(e) => edit(parseInt(e.target.value, 10))}
    />
    <button aria-label="add" className="count" onClick={() => add()}>+</button>
  </>
);

ProductQuantity.defaultProps = { quantity: 0 };
