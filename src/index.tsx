import './polyfills';
import React from 'react';
import { render } from 'react-dom';
import { App } from './app/components'

const domContainer = document.querySelector('#root');
render(<App />, domContainer);