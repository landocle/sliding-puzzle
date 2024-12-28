import React from 'react';
import { createRoot } from 'react-dom/client';

import App from '@Src';

const rootEl = document.getElementById('root');
const root = createRoot(rootEl)

const renderComponent = Component => {
  root.render(<Component />);
};

renderComponent(App);
