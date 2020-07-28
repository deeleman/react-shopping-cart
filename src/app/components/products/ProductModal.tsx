import React from 'react';
import { CartItem, ItemCode } from 'shopping-cart/types';
import { images } from './../../../img/items';
import './ProductModal.scss';
import ReactDOM from 'react-dom';

interface ProductModalProps {
  cartItem?: CartItem;
  scan: (itemCode: ItemCode) => void;
  close: () => void;
}

const fetchImage = (cartItem: CartItem) => cartItem ?
  images[`${cartItem.shortName.toLowerCase()}Large`] || images['fallbackLarge'] :
  null;

export const ProductModal: React.FunctionComponent<ProductModalProps> = ({ cartItem, scan, close }) => {
  const scanItemHandler = (cartItem: CartItem) => {
    scan(cartItem.code);
    close();
  };


  return cartItem && cartItem.shortName
    ? ReactDOM.createPortal(
      <div className="modal">
        <figure className="modal__image">
          <img role="img" src={fetchImage(cartItem)} alt={cartItem.shortName} />
        </figure>
        <aside className="modal__description">
          <h3 className="modal__description-name-price">
            <span>{cartItem.name}</span>
            <span>{cartItem.price} €</span>
          </h3>
          <p className="modal__description-abstract">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam feugiat tristique tortor sed 
            rhoncus. Sed a odio et metus blandit lobortis. Aliquam justo ligula, laoreet eu diam vel, 
            dapibus auctor turpis. Maecenas enim dolor, faucibus at neque eu, tempus consequat sapien.
          </p>
          <h4 className="modal__description-code">Product code {cartItem.id}</h4>
          <div>
            <button role="button" type="submit" onClick={() => scanItemHandler(cartItem)}>Add to cart</button>
          </div>
          <button className="modal__close" onClick={close} aria-label="close" />
        </aside>
      </div>,
      document.querySelector('#modals') || document.body
    )
    : null;
};