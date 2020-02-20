import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { store } from './store';
import { RootRouter } from './router';

import './icons';

// Main app
const App: React.FC = () => (
  <Provider store={store}>
    <RootRouter />
  </Provider>
);

render(<App />, document.getElementById('app'));
