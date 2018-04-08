module.exports = {
  modify(config, { target, dev }, webpack) {
    // Since RN web takes care of CSS, we should remove it for a #perf boost
    /** @toggle: turn these on when you start adding css */
    config.module.rules = config.module.rules
      .filter(
        rule =>
          !(rule.test && rule.test.exec && rule.test.exec('./something.css'))
      )
      .filter(
        rule =>
          !(
            rule.test &&
            rule.test.exec &&
            rule.test.exec('./something.module.css')
          )
      );
    // /** @endtoggle */

    const extPlugin = require(require.resolve('extract-text-webpack-plugin'));
    config.plugins = config.plugins.filter((w) => !(w instanceof extPlugin));

    // add ./src to module resolver so you can import modules with absolute path
    config.resolve.modules.push('src');

    return config;
  },
};
