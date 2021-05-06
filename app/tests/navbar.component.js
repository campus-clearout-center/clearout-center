import { Selector } from 'testcafe';

class NavBar {

  /** If someone is logged in, then log them out, otherwise do nothing. */
  async ensureLogout(testController) {
    const loggedInUser = await Selector('#navbar-current-user').exists;
    if (loggedInUser) {
      await testController.click('#navbar-current-user');
      await testController.click('#navbar-sign-out');
    }
  }

  async clickOnLogo(testController) {
    await testController.click('#logo');
  }

  async gotoSigninPage(testController) {
    await this.ensureLogout(testController);
    await testController.click('#login-dropdown');
    await testController.click('#login-dropdown-sign-in');
  }

  /** Check that the specified user is currently logged in. */
  async isLoggedIn(testController, username) {
    const loggedInUser = Selector('#navbar-current-user').innerText;
    await testController.expect(loggedInUser).eql(username);
  }

  /** Check that someone is logged in, then click items to logout. */
  async logout(testController) {
    await testController.expect(Selector('#navbar-current-user').exists).ok();
    await testController.click('#navbar-current-user');
    await testController.click('#navbar-sign-out');
  }

  /** Pull down login menu, go to sign up page. */
  async gotoSignupPage(testController) {
    await this.ensureLogout(testController);
    await testController.click('#login-dropdown');
    await testController.click('#login-dropdown-sign-up');
  }

  async gotoProfilePage(testController) {
    await testController.click('#navbar-current-user');
    await testController.click('#navbar-profile');
  }

  async gotoAnItem(testController) {
    await testController.click('#catalog');
    await testController.click('#appliances');
  }

  async gotoReportList(testController) {
    await testController.click('#reportlist-page');
  }

  async gotoAddItem(testController) {
    await testController.click('#additem');
  }

  async gotoCatalogFilters(testController) {
    await testController.click('#catalog');
    await testController.click('#appliances');
    await testController.click('#catalog');
    await testController.click('#books');
    await testController.click('#catalog');
    await testController.click('#services');
    await testController.click('#catalog');
    await testController.click('#misc');
  }

  async gotoAppliances(testController) {
    await testController.click('#catalog');
    await testController.click('#appliances');
  }

  async gotoBooks(testController) {
    await testController.click('#catalog');
    await testController.click('#books');
  }

  async gotoServices(testController) {
    await testController.click('#catalog');
    await testController.click('#services');
  }

  async gotoMisc(testController) {
    await testController.click('#catalog');
    await testController.click('#misc');
  }

  async gotoListAll(testController) {
    await testController.click('#listall');
  }

  async gotoContactUs(testController) {
    await testController.click('#contactus-redirect');
  }
}

export const navBar = new NavBar();
