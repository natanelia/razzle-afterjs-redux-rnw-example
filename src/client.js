import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import { BrowserRouter } from 'react-router-dom';
import { ensureReady, After } from '@jaredpalmer/after';
import urls from './urls';

const store = configureStore(window.__PRELOADED_STATE__);

ensureReady(urls).then((data) =>
  hydrate(
    <BrowserRouter>
      <Provider store={store}>
        <After data={data} routes={urls} />
      </Provider>
    </BrowserRouter>,
    document.getElementById('root'),
  ),
);

if (module.hot) {
  module.hot.accept();
}
