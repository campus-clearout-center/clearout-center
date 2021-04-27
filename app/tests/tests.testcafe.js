import { landingPage } from './landing.page';
import { signinPage } from './signin.page';
import { signoutPage } from './signout.page';
import { signupPage } from './signup.page';
import { profilePage } from './profile.page';
import { navBar } from './navbar.component';
import { listItemsPage } from './listitems.page';
import { reportItemPage } from './reportitem.page';
import { reportListPage } from './reportlist.page';
import { addItemPage } from './additem.page';
import { editItemPage } from './edititem.page';
import { offerItemPage } from './offeritem.page';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { firstName: 'John', lastName: 'Doe', username: 'john@foo.com', password: 'changeme' };
const newcred = { firstName: 'Rick', lastName: 'Roll', username: 'rickroll@hawaii.edu', password: 'changeme' };
const admincreds = { username: 'admin@foo.com', password: 'changeme' };
const report = 'it is inappropriate';
const item = { itemName: 'Phone', address: '2712 Nihi Street', image: 'https://www.lg.com/us/images/cell-phones/md07513841/gallery/Desktop-01.jpg', price: '100', description: 'Partially used', label: 'Appliances' };

fixture('meteor-application-template-react localhost test with default db')
  .page('http://localhost:3000');

test('Test that landing page shows up', async (testController) => {
  await landingPage.isDisplayed(testController);
});

/** Will fail if you do not reset meteor... Comment out signup test when adding new tests */
test('Test that signup works', async (testController) => {
  await landingPage.gotoSignupPage(testController);
  await signupPage.signupUser(testController, newcred.firstName, newcred.lastName, newcred.username, newcred.password);
  await profilePage.isDisplayed(testController);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test that signin and logout works', async (testController) => {
  await landingPage.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test the Profile Page', async (testController) => {
  await landingPage.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.gotoProfilePage(testController);
  await profilePage.isDisplayed(testController);
  await profilePage.hasTable(testController);
});

test('Test that the admin page works', async (testController) => {
  await landingPage.gotoSigninPage(testController);
  await signinPage.signin(testController, admincreds.username, admincreds.password);
  await navBar.isLoggedIn(testController, admincreds.username);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test if report page works', async (testController) => {
  await landingPage.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.gotoAnItem(testController);
  await listItemsPage.isDisplayed(testController);
  await listItemsPage.pressReport(testController);
  await reportItemPage.typeInReport(testController, report);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test if the report exists on the admin page', async (testController) => {
  await landingPage.gotoSigninPage(testController);
  await signinPage.signin(testController, admincreds.username, admincreds.password);
  await navBar.isLoggedIn(testController, admincreds.username);
  await navBar.gotoReportList(testController);
  await reportListPage.isDisplayed(testController);
  await reportListPage.hasCard(testController);
});

test('Test if you can add an item', async (testController) => {
  await landingPage.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.gotoAddItem(testController);
  await addItemPage.isDisplayed(testController);
  await addItemPage.typeInItem(testController, item.itemName, item.address, item.image, item.price, item.description, item.label);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test if you can filter through items', async (testController) => {
  await landingPage.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.gotoCatalogFilters(testController);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test if you can edit an item', async (testController) => {
  await landingPage.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.gotoAnItem(testController);
  await listItemsPage.isDisplayed(testController);
  await listItemsPage.pressEdit(testController);
  await editItemPage.isDisplayed(testController);
  await editItemPage.typeInEdit(testController, item.itemName, item.address, item.image, item.price, item.description, item.label);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test if you can offer an item', async (testController) => {
  await landingPage.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.gotoAnItem(testController);
  await listItemsPage.isDisplayed(testController);
  await listItemsPage.pressOffer(testController);
  await offerItemPage.isDisplayed(testController);
  await offerItemPage.pressPurchase(testController);
  await navBar.gotoProfilePage(testController);
  await profilePage.isDisplayed(testController);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});
