import { Selector } from 'testcafe';

class EdititemPage {

  /* checks list item of appliance */

  constructor() {
    this.pageId = '#editItem';
    this.pageSelector = Selector(this.pageId);
  }

  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async typeInEdit(testController, itemName, address, image, price, description, label) {
    await this.isDisplayed(testController);
    await testController.click('#edit-itemName');
    await testController.pressKey('ctrl+a delete');
    await testController.typeText('#edit-itemName', itemName);
    await testController.click('#edit-address');
    await testController.pressKey('ctrl+a delete');
    await testController.typeText('#edit-address', address);
    await testController.click('#edit-image');
    await testController.pressKey('ctrl+a delete');
    await testController.typeText('#edit-image', image);
    await testController.click('#edit-price');
    await testController.pressKey('ctrl+a delete');
    await testController.typeText('#edit-price', price);
    await testController.click('#edit-description');
    await testController.click(Selector('#edit-description').find('option').withText(description));
    await testController.click('#edit-label');
    await testController.click(Selector('#edit-label').find('option').withText(label));
    await testController.click('#edit-submit');
    await testController.pressKey('enter');
  }
}

export const editItemPage = new EdititemPage();
