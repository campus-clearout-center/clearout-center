import { Selector } from 'testcafe';

class EditProfilePage {
  constructor() {
    this.pageId = '#edit-profile-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async editBio(testController, bio) {
    await testController.typeText('#edit-bio', bio);
    await testController.click('#edit-submit');
  }
}

export const editprofilePage = new EditProfilePage();
