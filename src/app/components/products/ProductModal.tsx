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
          style={{ backgroundImage: `url(${images[`${item.shortName.toLowerCase()}Large`] || images['fallbackLarge']})` }}
        >
        </figure>
        <aside className="modal__description">
          <h3 className="modal__description-name-price">
            <span>{item.name}</span>
            <span>{item.price} €</span>
          </h3>
          <p className="modal__description-abstract">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam feugiat tristique tortor sed 
            rhoncus. Sed a odio et metus blandit lobortis. Aliquam justo ligula, laoreet eu diam vel, 
            dapibus auctor turpis. Maecenas enim dolor, faucibus at neque eu, tempus consequat sapien.
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
