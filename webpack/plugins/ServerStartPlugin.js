/* eslint no-console: 0 */
const { spawn } = require('child_process');

class ServerStartPlugin {
  static onStdOut(data) {
    const time = new Date().toTimeString();
    process.stdout.write(time.replace(/.*(\d{2}:\d{2}:\d{2}).*/, '[$1] '));
    process.stdout.write(data);
  }

  constructor(serverEntry) {
    this.child = null;
    this.serverEntry = serverEntry;
  }

  apply(compiler) {
    compiler.hooks.done.tapAsync('ServerStartHook', (cp, callback) => {
      if (this.child) {
        this.child.kill('SIGTERM');
      }
      this.child = spawn('node', [this.serverEntry], {
        env: {
          ...process.env,
        },
        silent: false,
      });
      console.log('[server]: start server');
      this.child.stdout.on('data', ServerStartPlugin.onStdOut);
      this.child.stderr.on('data', (x) => process.stderr.write(x));
      callback();
    });
  }
}

module.exports = ServerStartPlugin;
