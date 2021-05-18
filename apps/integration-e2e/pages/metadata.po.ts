import { by, element, ElementFinder } from 'protractor';
import { Utils } from '../helpers/utils';

const utils = new Utils();

export class Metadata {
  public title?: string;
  public content?: string;

  constructor(
    public fields?: {
      title?: string;
      content?: string;
    }
  ) {
    if (fields) {
      this.title = fields.title || this.title;
      this.content = fields.content || this.content;
    }
  }
}

export class MetadataPage {
  async getAll() {
    const metadatas = [];
    const el = element.all(by.css('.metadata'));
    await utils.waitForElement(el.first());
    const count = await el.count();
    for (let i = 0; i < count; i++) {
      const metadata = el.get(i);
      const title = await metadata.element(by.css('.title')).getText();
      const content = await metadata.element(by.css('.content')).getText();
      metadatas.push(
        new Metadata({
          title: title,
          content: content,
        })
      );
    }
    return metadatas;
  }

  async getAttribution() {
    return utils.promisify(async () =>
      utils.waitForElement(element(by.css('.content.attribution')))
    );
  }

  async getLicense() {
    return utils.promisify(async () =>
      utils.waitForElement(element(by.css('.content.license')))
    );
  }

  async isLogoDisplayed(): Promise<boolean> {
    try {
      await utils.waitForElement(element(by.css('.content.logo')));
      return true;
    } catch (e) {
      return false;
    }
  }
}
