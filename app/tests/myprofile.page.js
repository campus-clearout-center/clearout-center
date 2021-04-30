import { Selector } from 'testcafe';

class MyProfilePage {
  constructor() {
    this.pageId = '#myprofile-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async hasTable(testController) {
    const rowCount = Selector('tr').count;
    await testController.expect(rowCount).eql(3);
    await testController.expect(this.pageSelector.exists).ok();
  }

  async gotoEdit(testController) {
    await testController.click('#edit-profile');
  }

}

export const myprofilePage = new MyProfilePage();
