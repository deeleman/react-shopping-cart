import React from 'react';
import ReactDOM from 'react-dom';
import { Item } from 'shopping-cart/types';
import { images } from './../../../img/items';
import './ProductModal.scss';

interface ProductModalProps {
  item?: Item;
  scan: (itemId: string) => void;
  close: () => void;
}

const sanitizeName = (name: string) => name.split(' ').pop()?.replace('-', '').toLowerCase();

export const ProductModal: React.FunctionComponent<ProductModalProps> = ({ item, scan, close }) => {
  const scanItemHandler = (scannedItem: Item) => {
    scan(scannedItem.id);
    close();
  };

  return item && item.id
    ? ReactDOM.createPortal(
      <div className="modal" role="dialog">
        <figure
          role="img"
          className="modal__image"
          style={{ backgroundImage: `url(${images[`${sanitizeName(item.name)}Large`] || images['fallbackLarge']})` }}
        >
        </figure>
        <aside className="modal__description">
          <h3 className="modal__description-name-price">
            <span>{item.name}</span>
            <span>{item.price} €</span>
          </h3>
          <p className="modal__description-abstract">
            Surprise your friends and family with this fantastic <strong>{item.name}</strong> branded
            with your favorite JavaScript library. This {item.name.toLowerCase()} has been manufactured
            with the best quality materials and it is designed to endure long time and regular washing.
          </p>
          <h4 className="modal__description-code">Product code {item.id}</h4>
          <div>
            <button role="button" type="submit" onClick={() => scanItemHandler(item)}>Add to cart</button>
          </div>
        </aside>
        <button className="modal__close" onClick={close} aria-label="close" />
      </div>,
      document.querySelector('#modals') || document.body
    )
    : null;
};
