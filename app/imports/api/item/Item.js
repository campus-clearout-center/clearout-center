import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/**
 * The ItemCollection. It encapsulates state and variable values for stuff.
 */
class ItemCollection {
  constructor() {
    // The name of this collection.
    this.name = 'ItemCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      firstName: String,
      lastName: String,
      address: String,
      itemName: String,
      image: String,
      price: String,
      description: { type: String, allowedValues: ['Never opened', 'Partially used', 'Still good'], defaultValue: 'Partially used' },
      label: { type: String, allowedValues: ['Appliances', 'Textbook', 'Service', 'Miscellaneous'] },
      buyer: { type: String, optional: true },
      owner: String,
    }, { tracker: Tracker });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

/**
 * The singleton instance of the ItemCollection.
 * @type {ItemCollection}
 */
export const Item = new ItemCollection();
