import { defineSupportCode } from 'cucumber';
import { expect } from '../helpers/chai-imports';
import { ViewerPage } from '../pages/viewer.po';

defineSupportCode(function ({ Given, Then }) {
  const page = new ViewerPage();

  Given(/^the viewer is opened with a publication$/, async () => {
    await page.open();
    expect(await(await page.openSeadragonElement()).isPresent()).to.be.true;
  });

  Given(/^the viewer is opened with a publication with attribution labels$/, async () => {
    await page.open();
  });

  Given(/^the viewer is opened with a publication with licenses associated with it$/, async () => {
    await page.open();
  });

  Given(/^a (.*) publication with 10 pages$/, async (viewingDirection: string) => {
    if (viewingDirection === 'left-to-right') {
      await page.open('a-ltr-book-10-pages');
    } else if (viewingDirection === 'left-to-right') {
      await page.open('a-rtl-book-10-pages');
    }
  });

  Given(/^the user is on page (.*)$/, async (pageNumber: number) => {
    await page.goToPage(pageNumber - 1);
  });

});
