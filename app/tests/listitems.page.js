import { Selector } from 'testcafe';

class ListitemsPage {

  /* checks list item of appliance */

  constructor() {
    this.pageId = '#listitems-page';
    this.pageSelector = Selector(this.pageId);
  }

  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async pressReport(testController) {
    await testController.click('#report-button');
  }
}

export const listItemsPage = new ListitemsPage();
