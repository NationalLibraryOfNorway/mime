const { After, Status } = require('cucumber');
import { browser } from 'protractor/built';

After(function (testCase) {
  const world = this;
  if (testCase.result.status === Status.FAILED) {
    return browser.takeScreenshot().then(function (screenShot) {
      // screenShot is a base-64 encoded PNG
      world.attach(screenShot, 'image/png');
    });
  }
});
