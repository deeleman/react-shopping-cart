import React from 'react';

interface ProductQuantityProps {
  quantity?: number;
  add: () => void;
  remove: () => void;
  edit: (quantity: number) => void;
}

export const ProductQuantity: React.FunctionComponent<ProductQuantityProps> = ({ quantity, add, remove, edit }) => (
  <React.Fragment>
    <button aria-label="remove" className="count" onClick={() => remove()}>-</button>
    <input aria-label="product-quantity"
      type="number"
      className="product-quantity"
      value={quantity}
      onChange={(e) => edit(parseInt(e.target.value, 10))}
    />
    <button aria-label="add" className="count" onClick={() => add()}>+</button>
  </React.Fragment>
);

ProductQuantity.defaultProps = { quantity: 0 };
