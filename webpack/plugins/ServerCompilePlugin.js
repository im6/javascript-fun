/* eslint no-console: 0 */

const webpack = require('webpack');

class ServerWatchingPlugin {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    compiler.hooks.afterPlugins.tap('ServerWatchPluginHook', () => {
      console.log('[server]: compile server');
      webpack(this.options, (err, stats) => {
        if (err || stats.hasErrors()) {
          console.log(err);
          console.log(stats.toString());
        }
        console.log(
          stats.toString({
            chunks: false,
            colors: true,
          })
        );
      });
    });
  }
}

module.exports = ServerWatchingPlugin;
