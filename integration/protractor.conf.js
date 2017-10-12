// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const argv = require('yargs').argv;
const path = require('path');
const multiCucumberHTLMReporter = require('multiple-cucumber-html-reporter');
const remoteBrowsers = require('./remote-browsers');

const config = {
  allScriptsTimeout: 11000,
  SELENIUM_PROMISE_MANAGER: false,
  specs: getFeatureFiles(),
  unknownFlags: [
    'cucumberOpts',
    'device'
  ],
  capabilities: getCapabilities(),
  baseUrl: 'http://localhost:8080/',
  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),
  cucumberOpts: {
    compiler: "ts:ts-node/register",
    require: [
      path.resolve(process.cwd(), './e2e/helpers/cucumber.config.ts'),
      path.resolve(process.cwd(), './e2e/**/*.steps.ts')
    ],
    format: 'pretty',
    tags: getTags()
  },
  onPrepare: function() {
    if (config.capabilities.platformName !== 'Android' && config.capabilities.platformName !== 'iOS') {
      const width = 1024;
      const height = 768;
      browser.driver.manage().window().setSize(width, height);
    }
  },
  disableChecks: true,
  ignoreUncaughtExceptions: true
};

if (process.env.TRAVIS) {
  config.sauceUser = process.env.SAUCE_USERNAME;
  config.sauceKey = process.env.SAUCE_ACCESS_KEY;
  config.capabilities = Object.assign(config.capabilities, {
    name: 'Mime E2E Tests',
    tunnelIdentifier: process.env.TRAVIS_JOB_NUMBER,
    build: process.env.TRAVIS_JOB_NUMBER
  });
}

function getCapabilities() {
  if (argv.browser) {
    const cap = remoteBrowsers.customLaunchers.find(l => l.browserName === argv.browser);
    return {
      browserName: cap.browserName,
      version: cap.version,
      platform: cap.platform,
      platformName: cap.platformName,
      platformVersion: cap.platformVersion,
      deviceName: cap.deviceName
    }
  } else {
    return {
      browserName: 'chrome'
    }
  }
}

function getTags() {
  let tags = ['~@Ignore']
  if (argv.tags) {
    tags = tags.concat(argv.tags.split(','));
  }
  return tags;
}

function getFeatureFiles() {
  if (argv.feature) {
    return argv.feature.split(',').map(feature => `${process.cwd()}/e2e/**/${feature}.feature`);
  }

  return [`${process.cwd()}/e2e/**/*.feature`];
}

exports.config = config;
