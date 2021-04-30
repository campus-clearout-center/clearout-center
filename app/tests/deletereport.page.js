import { Selector } from 'testcafe';

class DeletereportPage {

  /* checks list item of appliance */

  constructor() {
    this.pageId = '#delete-report';
    this.pageSelector = Selector(this.pageId);
  }

  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async pressDelete(testController) {
    await this.isDisplayed(testController);
    await testController.click('#report-delete');
    await testController.click(Selector('.swal-button--confirm'));
  }
}

export const deleteReportPage = new DeletereportPage();
