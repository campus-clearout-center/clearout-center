import { Meteor } from 'meteor/meteor';
import { Profiles } from '../../api/profile/Profiles';
import { Item } from '../../api/item/Item';

/* eslint-disable no-console */

// Initialize the database with a default data document.
function addData(data) {
  console.log(`  Adding: ${data.firstName} (${data.owner})`);
  Profiles.collection.insert(data);
}

// Initialize the ProfilesCollection if empty.
if (Profiles.collection.find().count() === 0) {
  if (Meteor.settings.defaultProfiles) {
    console.log('Creating default data.');
    Meteor.settings.defaultProfiles.map(data => addData(data));
  }
}

function addItem(data) {
  console.log(`  Adding: ${data.lastName} (${data.owner})`);
  Item.collection.insert(data);
}

// Initialize the ItemsCollection if empty.
if (Item.collection.find().count() === 0) {
  if (Meteor.settings.defaultItem) {
    console.log('Creating default item.');
    Meteor.settings.defaultItem.map(data => addItem(data));
  }
}
