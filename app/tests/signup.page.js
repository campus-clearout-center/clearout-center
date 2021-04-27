import { Selector } from 'testcafe';
import { navBar } from './navbar.component';

class SignupPage {
  constructor() {
    this.pageId = '#signup-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Signs up a new user, then checks to see that they are logged in by checking the navbar. */
  async signupUser(testController, firstName, lastName, username, password) {
    await this.isDisplayed(testController);
    await testController.typeText('#signup-form-firstName', firstName);
    await testController.typeText('#signup-form-lastName', lastName);
    await testController.typeText('#signup-form-email', username);
    await testController.typeText('#signup-form-password', password);
    await testController.pressKey('enter');
    await navBar.isLoggedIn(testController, username);
  }
}

export const signupPage = new SignupPage();
