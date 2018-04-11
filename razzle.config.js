const path = require('path');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  modify(config, { target, dev }, webpack) {
    // Since RN web takes care of CSS, we should remove it for a #perf boost
    /** @toggle: turn these on when you start adding css */
    // config.module.rules = config.module.rules
    //   .filter(
    //     (rule) =>
    //       !(rule.test && rule.test.exec && rule.test.exec('./something.css')),
    //   )
    //   .filter(
    //     (rule) =>
    //       !(
    //         rule.test &&
    //         rule.test.exec &&
    //         rule.test.exec('./something.module.css')
    //       ),
    //   );
    //   const extPlugin = require(require.resolve('extract-text-webpack-plugin'));
    //   config.plugins = config.plugins.filter((w) => !(w instanceof extPlugin));
    // // /** @endtoggle */

    /** @config: SASS Loader Support */
    const isServer = target !== 'web';

    const postCssLoader = {
      loader: 'postcss-loader',
      options: {
        ident: 'postcss',
        plugins: () => [
          autoprefixer({
            browsers: ['>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9'],
          }),
        ],
      },
    };

    const sassLoader = {
      loader: 'sass-loader',
      options: {
        includePaths: [path.resolve(__dirname, '../node_modules')],
      },
    };

    config.module.rules.push({
      test: /\.scss$/,
      use: isServer
        ? ['css-loader', sassLoader]
        : dev
          ? [
              'style-loader',
              {
                loader: 'css-loader',
                options: { modules: false, sourceMap: true },
              },
              postCssLoader,
              sassLoader,
            ]
          : ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: [
                {
                  loader: 'css-loader',
                  options: { importLoaders: 1 },
                },
                postCssLoader,
                sassLoader,
              ],
            }),
    });

    if (!isServer && !dev) {
      config.plugins.push(
        new ExtractTextPlugin({
          filename: 'static/css/[name].[contenthash:8].css',
          allChunks: true,
        }),
      );
    }
    /** @endconfig */

    // add ./src to module resolver so you can import modules with absolute path
    config.resolve.modules.push('src');

    config.devtool = dev ? 'eval-source-map' : 'none';

    return config;
  },
};
