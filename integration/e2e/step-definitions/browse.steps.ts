import { defineSupportCode } from 'cucumber';
import { expect } from '../helpers/chai-imports';

import { ViewerPage } from './../pages/viewer.po';
import { MetadataPage } from './../pages/metadata.po';

defineSupportCode(function ({ Given, When, Then }) {
  const page = new ViewerPage();

  When(/^the user swipe (.*) and the velocity is between (.*)$/, async (direction: string, velocity: string) => {
    console.log('direction', direction);
    console.log('velocity', velocity);
    if (direction === 'left-to-right') {
      const start = {
        x: 200,
        y: 0
      };
      const end = {
        x: 0,
        y: 0
      };
      page.swipe(start, end);
    }
  });

  Then(/^the content of the page (.*) is displayed$/, async (pageNumber: number) => {
    console.log('direction', pageNumber);
    return Promise.resolve('pending');
  });

});

