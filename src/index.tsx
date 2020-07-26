import React from 'react';
import { render } from 'react-dom';
import { App } from './app';
import { settings } from './settings';
import './polyfills';

const domContainer = document.querySelector('#root');
render(<App settings={settings} />, domContainer);