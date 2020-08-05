// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html
const process = require('process');
process.env.CHROME_BIN = require('puppeteer').executablePath();

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, './coverage/live-edge-atv'),
      reports: ['html', 'lcovonly', 'text-summary'],
      fixWebpackSourcePaths: true
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    singleRun: false,
    restartOnFileChange: true,
    browsers: ['Chrome', 'ChromeHeadless', 'Chrome_no_sandbox'],
    customLaunchers: {
      Chrome_no_sandbox: {
        base: 'ChromeHeadless',
        browserDisconnectTimeout: 10000,
        browserDisconnectTolerance: 3,
        browserNoActivityTimeout: 60000,
        flags: [
          '--headless',
          '--disable-web-security',
          '--disable-gpu',
          '--no-sandbox',
          '--remote-debugging-port=9222',
          '--disable-translate',
          '--disable-extensions',
          '--disable-software-rasterizer',
          '--mute-audio',
          '--hide-scrollbars',
          '--disable-dev-shm-usage',
          '--no-proxy-server'
        ]
      }
    },
  });
};
