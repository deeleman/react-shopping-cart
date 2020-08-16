import './polyfills';
import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';

import { App, store } from './app';
import { settings } from './settings';

const domContainer = document.querySelector('#root');

render(
  <Provider store={store}>
    <App settings={settings} />
  </Provider>,
  domContainer
);