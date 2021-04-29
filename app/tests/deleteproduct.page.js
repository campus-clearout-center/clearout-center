import { Selector } from 'testcafe';

class DeleteproductPage {

  /* checks list item of appliance */

  constructor() {
    this.pageId = '#delete-item';
    this.pageSelector = Selector(this.pageId);
  }

  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async pressDelete(testController) {
    await this.isDisplayed(testController);
    await testController.click('#item-delete');
    await testController.click(Selector('.swal-button--confirm'));
  }
}

export const deleteProductPage = new DeleteproductPage();
