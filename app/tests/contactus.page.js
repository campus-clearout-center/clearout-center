import { Selector } from 'testcafe';

class ContactusPage {

  /* checks list item of appliance */

  constructor() {
    this.pageId = '#contactus-page';
    this.pageSelector = Selector(this.pageId);
  }

  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }
}

export const contactUsPage = new ContactusPage();
