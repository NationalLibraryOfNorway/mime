const { Given, When, Then } = require('cucumber');
const { expect } = require('chai');

import { ViewerPage } from './../pages/viewer.po';
import { MetadataPage } from './../pages/metadata.po';

const viewer = new ViewerPage();
const metadata = new MetadataPage();

Then('the attribution must be shown', async () => {
  const pageAttribution = await viewer.getAttribution();
  await viewer.openContentsDialog();
  const metadataAttribution = await metadata.getAttribution();

  expect(await pageAttribution.getText()).to.eql('This is a test attribution');
  expect(await metadataAttribution.getText()).to.eql('This is a test attribution');
});

Then('the license must be shown as hyperlinks', async () => {
  await viewer.openContentsDialog();
  const license = await metadata.getLicense();

  expect(await license.getText()).to.eql('https://beta.nb.no/lisens/cc0');
});
