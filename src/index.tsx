import React from 'react';
import { render } from 'react-dom';
import { App, httpSettings } from './app';
import './polyfills';

const domContainer = document.querySelector('#root');
render(<App settings={httpSettings} />, domContainer);