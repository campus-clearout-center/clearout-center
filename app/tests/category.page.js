import { Selector } from 'testcafe';

class CategoryPage {
  constructor() {
    this.pageId = '#appliances';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async hasDefaultItem(testController) {
    const cardCount = Selector('.card').count;
    await testController.expect(cardCount).gte(1);
  }

}

export const categoryPage = new CategoryPage();
