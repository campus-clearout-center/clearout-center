import { Selector } from 'testcafe';

class AdditemPage {

  /* checks list item of appliance */

  constructor() {
    this.pageId = '#add-item';
    this.pageSelector = Selector(this.pageId);
  }

  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async typeInItem(testController, itemName, address, image, price, description, label) {
    await this.isDisplayed(testController);
    await testController.typeText('#itemName-area', itemName);
    await testController.typeText('#address-area', address);
    await testController.typeText('#image-area', image);
    await testController.typeText('#price-area', price);
    await testController.click('#description-area');
    await testController.click(Selector('#description-area').find('option').withText(description));
    await testController.click('#label-area');
    await testController.click(Selector('#label-area').find('option').withText(label));
    await testController.click('#item-submit');
    await testController.pressKey('enter');
  }
}

export const addItemPage = new AdditemPage();
