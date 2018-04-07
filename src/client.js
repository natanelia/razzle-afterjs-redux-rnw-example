import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ensureReady, After } from '@jaredpalmer/after';
import urls from './urls';

ensureReady(urls).then(data =>
  hydrate(
    <BrowserRouter>
      <After data={data} routes={urls} />
    </BrowserRouter>,
    document.getElementById('root')
  )
);

if (module.hot) {
  module.hot.accept();
}
