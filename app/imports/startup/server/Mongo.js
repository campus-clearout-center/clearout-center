import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/Stuff.js';
import { Item } from '../../api/item/Item';

/* eslint-disable no-console */

// Initialize the database with a default data document.
function addData(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Stuffs.collection.insert(data);
}

// Initialize the StuffsCollection if empty.
if (Stuffs.collection.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.map(data => addData(data));
  }
}

function addItem(data) {
  console.log(`  Adding: ${data.lastName} (${data.owner})`);
  Item.collection.insert(data);
}

// Initialize the StuffsCollection if empty.
if (Item.collection.find().count() === 0) {
  if (Meteor.settings.defaultItem) {
    console.log('Creating default item.');
    Meteor.settings.defaultItem.map(data => addItem(data));
  }
}
