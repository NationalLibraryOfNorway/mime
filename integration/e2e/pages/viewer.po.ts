import { browser, element, ElementFinder, by, By, protractor } from 'protractor';
import { promise, WebElement } from 'selenium-webdriver';
import { Utils } from '../helpers/utils';

const utils = new Utils();
export class ViewerPage {
  private thumbStartPosition = {x: 600, y: 300};
  private pointerPosition1 = {x: 650, y: 275};
  private pointerPosition2 = {x: 750, y: 200};

  async open() {
    await browser.get('/');
    await browser.sleep(5000);
  }

  async goToPage(pageNumber: number) {
    const slider = await utils.waitForElement(element(by.css('#navigationSlider')));
    for (let i = 0; i < pageNumber; i++) {
      await slider.sendKeys(protractor.Key.ARROW_RIGHT);
    }
  }

  async getCurrentPageNumber() {
    const el =  await utils.waitForElement(element(by.css('#currentPageNumber')));
    const currentPageNumber = await el.getText();
    return currentPageNumber;
  }

  async openContentsDialog() {
    await element(by.css('#contentsDialogButton')).click();
    await utils.waitForElement(element(by.css('.contents-container')));
  }

  fullscreenButton(): ElementFinder {
    return element(by.css('#fullscreenButton'));
  }

  exitFullscreenButton(): ElementFinder {
    return element(by.css('#exitFullscreenButton'));
  }

  openSeadragonElement() {
    const el = element(by.css('.openseadragon-container'));
    return utils.waitForElement(el);
  }

  getAttribution() {
    const el = element(by.css('#attribution-container > .contents'));
    return utils.waitForElement(el);
  }

  isFullscreen(): promise.Promise<boolean> {
    return browser.executeScript('return (document.fullscreenElement'
      + ' || document.mozFullScreenElement'
      + ' || document.webkitFullscreenElement'
      + ' || document.msFullscreenElement) != null');
  }

  getHeader() {
    const el = element(by.css('mime-viewer-header'));
    return utils.waitForElement(el);
  }

  getFooter() {
    const el = element(by.css('mime-viewer-footer'));
    return utils.waitForElement(el);
  }

  getFirstPageOverlay() {
    const el = element.all(by.css('svg rect')).first();
    return utils.waitForElement(el);
  }

  getAnimationTime(): promise.Promise<number> {
    return browser.executeScript('return window.openSeadragonViewer.animationTime;');
  }

  getHomeZoom(): promise.Promise<number> {
    return browser.executeScript('return window.openSeadragonViewer.viewport.getHomeZoom();');
  }

  setHomeZoom(): promise.Promise<any> {
    return browser.executeScript('window.openSeadragonViewer.viewport.goHome(true);');
  }

  getZoomLevel(): promise.Promise<number> {
    return browser.executeScript('return window.openSeadragonViewer.viewport.getZoom(true);');
  }

  setZoomLevel(level: number): promise.Promise<any> {
    return browser.executeScript('window.openSeadragonViewer.viewport.zoomTo(' + level + ');');
  }

  getMinZoom(): promise.Promise<number> {
    return browser.executeScript('return window.openSeadragonViewer.viewport.getMinZoom();');
  }

  getMaxZoom(): promise.Promise<number> {
    return browser.executeScript('return window.openSeadragonViewer.viewport.getMaxZoom();');
  }

  getCenter(): promise.Promise<Point> {
    return browser.executeScript('return window.openSeadragonViewer.viewport.getCenter(false);');
  }

  getBounds(): promise.Promise<any> {
    return browser.executeScript('return window.openSeadragonViewer.viewport.getBounds(true);');
  }

  async swipe(startPoint: Point, endPoint: Point): Promise<void> {
    await browser.touchActions()
      .tapAndHold(startPoint)
      .release(endPoint)
      .perform();
  }

  async pinchOut(): Promise<void> {
    await browser.touchActions()
      .tapAndHold(this.thumbStartPosition)
      .tapAndHold(this.pointerPosition1)
      .move(this.pointerPosition2)
      .perform();
  }

  async pinchIn(): Promise<void> {
    await browser.touchActions()
      .tapAndHold(this.thumbStartPosition)
      .tapAndHold(this.pointerPosition2)
      .move(this.pointerPosition1)
      .perform();
  }

  pan(point: Point): promise.Promise<any> {
    return browser.executeScript(`window.openSeadragonViewer.viewport.panTo({x: ${point.x}, y: ${point.y}});`);
  }

  async zoomIn(): Promise<void> {
    const newZoomLevel = (await this.getZoomLevel()) * 2;
    await browser.executeScript('window.openSeadragonViewer.viewport.zoomTo(' + newZoomLevel + ');');
  }

  async zoomOut(): Promise<void> {
    const newZoomLevel = (await this.getZoomLevel()) / 2;
    await browser.executeScript('window.openSeadragonViewer.viewport.zoomTo(' + newZoomLevel + ');');
  }

  async dblClick(): Promise<void> {
    await browser.findElement(By.css('.openseadragon-canvas')).then((canvas: WebElement) => {
      return browser.actions()
        .mouseMove(canvas)
        .doubleClick()
        .perform();
    });
  }

  async dblTap(): Promise<void> {
    await browser.findElement(By.css('.openseadragon-canvas')).then((canvas: WebElement) => {
      return browser.touchActions()
        .doubleTap(canvas)
        .perform();
    });
  }

  async clickZoomInButton(): Promise<void> {
    await this.clickNavigationButton('zoomInButton');
  }

  async clickZoomOutButton(): Promise<void> {
    await this.clickNavigationButton('zoomOutButton');
  }

  async clickNavigationButton(buttonId: string): Promise<void> {
    const button = await utils.waitForElement(element(by.id(buttonId)));
    await utils.clickElement(button);
  }

  async waitForAnimation(): Promise<void> {
    await browser.sleep((await this.getAnimationTime()) * 100);
  }

  async isDashboardMode(): Promise<boolean> {
    const header = await this.getHeader();
    const footer = await this.getFooter();
    const headerDisplay = header.getCssValue('display');
    const footerDisplay = footer.getCssValue('display');

    const headerisPresent = (await headerDisplay) === 'block';
    const footerisPresent = (await footerDisplay) === 'block';
    return (headerisPresent && headerisPresent);
  }

  async isPageMode(): Promise<boolean> {
    const header = await this.getHeader();
    const footer = await this.getFooter();
    const headerDisplay = header.getCssValue('display');
    const footerDisplay = footer.getCssValue('display');

    const headerisHidden = (await headerDisplay) === 'none';
    const footerisHidden = (await footerDisplay) === 'none';
    return (headerisHidden && footerisHidden);
  }
}

export interface Point {
  x: number;
  y: number;
}
