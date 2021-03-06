import { Selector } from 'testcafe';

class ReportitemPage {

  /* checks list item of appliance */

  constructor() {
    this.pageId = '#report-item';
    this.pageSelector = Selector(this.pageId);
  }

  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async typeInReport(testController, report) {
    await this.isDisplayed(testController);
    await testController.typeText('#report-area', report);
    await testController.click('#report-submit');
    await testController.click(Selector('.swal-button--confirm'));
  }
}

export const reportItemPage = new ReportitemPage();
