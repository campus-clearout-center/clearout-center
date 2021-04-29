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

  async pressEdit(testController) {
    await testController.click('#editItem');
  }

  async pressOffer(testController) {
    await testController.click('#offer');
  }

  async pressDeleteItem(testController) {
    await testController.click('#delete-item-button');
  }

  async hasNoCard(testController) {
    const cardCount = Selector('div.ui.centered.card').count;
    await testController.expect(cardCount).lt(1);
  }
}

export const listItemsPage = new ListitemsPage();
