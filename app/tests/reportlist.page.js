import { Selector } from 'testcafe';

class ReportlistPage {

  /* checks list item of appliance */

  constructor() {
    this.pageId = '#reportlist-page';
    this.pageSelector = Selector(this.pageId);
  }

  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async hasCard(testController) {
    const cardCount = Selector('div.ui.centered.card').count;
    await testController.expect(cardCount).gte(1);
  }

  async pressDeleteReport(testController) {
    await testController.click('#delete-report-button');
  }

  async hasNoCard(testController) {
    const cardCount = Selector('div.ui.centered.card').count;
    await testController.expect(cardCount).lt(1);
  }
}

export const reportListPage = new ReportlistPage();
