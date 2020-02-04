import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faAngleDown,
  faCheck,
  faCircle,
  faCircleNotch,
  faEdit,
  faEnvelope,
  faExclamationTriangle,
  faGlobe,
  faLock,
  faLongArrowAltLeft,
  faPlus,
  faSearch,
  faSignOutAlt,
  faUser,
  faUsers,
  faWrench
} from '@fortawesome/free-solid-svg-icons';

import { store } from './store';
import { RootRouter } from './router';

// Build icons library
library.add(
  faAngleDown,
  faCheck,
  faCircle,
  faCircleNotch,
  faEdit,
  faEnvelope,
  faExclamationTriangle,
  faGlobe,
  faLock,
  faLongArrowAltLeft,
  faPlus,
  faSearch,
  faSignOutAlt,
  faUser,
  faUsers,
  faWrench
);

// Main app
const App: React.FC = () => (
  <Provider store={store}>
    <RootRouter />
  </Provider>
);

render(<App />, document.getElementById('app'));
