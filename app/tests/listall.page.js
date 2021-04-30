import { Selector } from 'testcafe';

class ListallitemPage {
  constructor() {
    this.pageId = '#listallitemspage';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async hasAllCards(testController) {
    const cardCount = Selector('.card').count;
    await testController.expect(cardCount).gte(4);
  }

  async testProfile(testController) {
    await testController.click('#profile-link');
  }

}

export const listAllItemPage = new ListallitemPage();
