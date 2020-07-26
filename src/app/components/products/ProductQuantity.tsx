import React from 'react';

interface ProductQuantityProps {
  quantity: number;
  add: () => void;
  remove: () => void;
  edit: (quantity: number) => void;
}

export const ProductQuantity: React.FunctionComponent<ProductQuantityProps> = ({ quantity, add, remove, edit }) => (
  <React.Fragment>
    <button className="count" onClick={() => remove()}>-</button>
    <input 
      type="number"
      className="product-quantity"
      value={quantity}
      onChange={(e) => edit(parseInt(e.target.value, 10))}
    />
    <button className="count" onClick={() => add()}>+</button>
  </React.Fragment>
);