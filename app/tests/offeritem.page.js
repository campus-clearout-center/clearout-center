import { Selector } from 'testcafe';

class OfferitemPage {

  /* checks list item of appliance */

  constructor() {
    this.pageId = '#purchase-item';
    this.pageSelector = Selector(this.pageId);
  }

  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async pressPurchase(testController) {
    await this.isDisplayed(testController);
    await testController.click('#purchase-item');
    await testController.pressKey('enter');
  }
}

export const offerItemPage = new OfferitemPage();
