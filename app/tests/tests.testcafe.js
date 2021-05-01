import { landingPage } from './landing.page';
import { signinPage } from './signin.page';
import { signoutPage } from './signout.page';
import { signupPage } from './signup.page';
import { profilePage } from './profile.page';
// eslint-disable-next-line import/named
import { navBar } from './navbar.component';
import { listItemsPage } from './listitems.page';
import { reportItemPage } from './reportitem.page';
import { reportListPage } from './reportlist.page';
import { categoryPage } from './category.page';
import { editprofilePage } from './editprofile.page';
import { offerItemPage } from './offeritem.page';
import { editItemPage } from './edititem.page';
import { addItemPage } from './additem.page';
import { deleteReportPage } from './deletereport.page';
import { deleteProductPage } from './deleteproduct.page';
import { listAllItemPage } from './listall.page';
import { myprofilePage } from './myprofile.page';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { firstName: 'John', lastName: 'Doe', username: 'john@foo.com', password: 'changeme' };
const newcred = { firstName: 'Rick', lastName: 'Roll', username: 'rickroll@hawaii.edu', password: 'changeme' };
const admincreds = { username: 'admin@foo.com', password: 'changeme' };
const report = 'it is inappropriate';
const item = { itemName: 'Phone', address: '2712 Nihi Street', image: 'https://www.lg.com/us/images/cell-phones/md07513841/gallery/Desktop-01.jpg', price: '100', description: 'Partially used', label: 'Appliances' };
const bio = 'I love UH';

fixture('meteor-application-template-react localhost test with default db')
  .page('http://localhost:3000');

test('Test that landing page shows up', async (testController) => {
  await landingPage.isDisplayed(testController);
});

/** Will fail if you do not reset meteor... Comment out signup test when adding new tests */
test('Test that signup works', async (testController) => {
  const newUser = `user-${new Date().getTime()}@hawaii.edu`;
  await landingPage.gotoSignupPage(testController);
  await signupPage.signupUser(testController, newcred.firstName, newcred.lastName, newUser, newcred.password);
  await myprofilePage.isDisplayed(testController);
  await navBar.isLoggedIn(testController, newUser);
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
  await myprofilePage.isDisplayed(testController);
  await myprofilePage.hasTable(testController);
});

test('Test view other profiles feature', async (testController) => {
  await landingPage.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.gotoListAll(testController);
  await listAllItemPage.testProfile(testController);
  await profilePage.isDisplayed(testController);
  await navBar.gotoAppliances(testController);
  await listItemsPage.testProfile(testController);
});

test('Test that the admin page works', async (testController) => {
  await landingPage.gotoSigninPage(testController);
  await signinPage.signin(testController, admincreds.username, admincreds.password);
  await navBar.isLoggedIn(testController, admincreds.username);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test that the user can see the list of all the items', async (testController) => {
  await landingPage.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.gotoListAll(testController);
  await listAllItemPage.isDisplayed(testController);
  await listAllItemPage.hasAllCards(testController);
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

test('Test if the report exists on the admin page. Make it also delete the report and the item', async (testController) => {
  await landingPage.gotoSigninPage(testController);
  await signinPage.signin(testController, admincreds.username, admincreds.password);
  await navBar.isLoggedIn(testController, admincreds.username);
  await navBar.gotoReportList(testController);
  await reportListPage.isDisplayed(testController);
  await reportListPage.hasCard(testController);
  await reportListPage.pressDeleteReport(testController);
  await deleteReportPage.pressDelete(testController);
  await reportListPage.hasNoCard(testController);
  await navBar.gotoAnItem(testController);
  await listItemsPage.isDisplayed(testController);
  await listItemsPage.pressDeleteItem(testController);
  await deleteProductPage.pressDelete(testController);
  await navBar.gotoAnItem(testController);
  await listItemsPage.hasNoCard(testController);
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
  await navBar.gotoListAll(testController);
  await listAllItemPage.isDisplayed(testController);
  await listItemsPage.pressOffer(testController);
  await offerItemPage.isDisplayed(testController);
  await offerItemPage.pressPurchase(testController);
  await navBar.gotoProfilePage(testController);
  await myprofilePage.isDisplayed(testController);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});
test('Test the Edit Profile page', async (testController) => {
  await landingPage.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.gotoProfilePage(testController);
  await profilePage.gotoEdit(testController);
  await editprofilePage.isDisplayed(testController);
  await editprofilePage.editBio(testController, bio);
});

test('Test the Category page', async (testController) => {
  await landingPage.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.gotoAppliances(testController);
  await categoryPage.hasDefaultItem(testController);
  await navBar.gotoBooks(testController);
  await categoryPage.hasDefaultItem(testController);
  await navBar.gotoServices(testController);
  await categoryPage.hasDefaultItem(testController);
  await navBar.gotoMisc(testController);
  await categoryPage.hasDefaultItem(testController);
});
