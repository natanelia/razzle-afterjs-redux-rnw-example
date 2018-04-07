import React from 'react';

import { asyncComponent } from '@jaredpalmer/after';

export default [
  {
    path: '/',
    exact: true,
    component: asyncComponent({
      loader: () => import('./components/Home'), // required
      Placeholder: () => <div>...LOADING HOMEPAGE...</div>, // this is optional, just returns null by default
    }),
  },
  {
    path: '/about',
    exact: true,
    component: asyncComponent({
      loader: () => import('./components/About'), // required
      Placeholder: () => <div>...LOADING ABOUTPAGE...</div>, // this is optional, just returns null by default
    }),
  },
];
