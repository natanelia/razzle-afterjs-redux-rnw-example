// ./src/Document.js
import React from 'react';
import { AfterRoot, AfterData } from '@jaredpalmer/after';
import { AppRegistry } from 'react-native';
import { renderToStaticMarkup } from 'react-dom/server';
// import { Provider } from 'react-redux';

import serialize from 'serialize-javascript';

class CustomDocument extends React.Component {
  static async getInitialProps({ assets, data, renderPage }) {
    // register the app
    const page = await renderPage();
    AppRegistry.registerComponent('App', () => CustomDocument);

    const { getStyleElement } = AppRegistry.getApplication('App', {});
    const rnwCss = renderToStaticMarkup(getStyleElement());

    // prerender rnw styles
    return { assets, data, ...page, rnwCss };
  }

  render() {
    const { helmet, assets, data, rnwCss, serverState } = this.props;

    // get attributes from React Helmet
    const htmlAttrs = helmet.htmlAttributes.toComponent();
    const bodyAttrs = helmet.bodyAttributes.toComponent();

    return (
      <html {...htmlAttrs}>
        <head>
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta charSet="utf-8" />
          <title>Designer Central | dekoruma.com</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {helmet.title.toComponent()}
          {helmet.meta.toComponent()}
          {helmet.link.toComponent()}
          {assets.client.css && (
            <link rel="stylesheet" href={assets.client.css} />
          )}
          {process.env.NODE_ENV === 'production' ? (
            <span
              dangerouslySetInnerHTML={{
                __html: `<script src="${assets.client.js}" defer></script>`,
              }}
            />
          ) : (
            <span
              dangerouslySetInnerHTML={
                { __html: `<script src="${assets.client.js}" defer crossorigin></script>` } // prettier-ignore
              }
            />
          )}
          <span dangerouslySetInnerHTML={{ __html: rnwCss }} />
        </head>
        <body {...bodyAttrs}>
          <AfterRoot />
          <AfterData data={data} />
          <span
            dangerouslySetInnerHTML={
              { __html: `<script>window.__PRELOADED_STATE__ = ${serialize(serverState)}</script>` } // prettier-ignore
            }
          />
        </body>
      </html>
    );
  }
}

export default CustomDocument;
