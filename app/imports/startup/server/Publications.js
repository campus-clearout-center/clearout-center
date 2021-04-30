import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Profiles } from '../../api/profile/Profiles';
import { Stuffs } from '../../api/stuff/Stuff';
import { Item } from '../../api/item/Item';
import { Admin } from '../../api/admin/Admin';
import { Notes } from '../../api/note/Notes';

// User-level publication.
// If logged in, then publish documents owned by this user. Otherwise publish nothing.
Meteor.publish(Profiles.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Profiles.collection.find({ owner: username });
  }
  return this.ready();
});

Meteor.publish(Profiles.pubPublicationName, function () {
  if (this.userId) {
    return Profiles.collection.find();
  }
  return this.ready();
});

Meteor.publish(Item.ownerPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Item.collection.find({ owner: username });
  }
  return this.ready();
});

Meteor.publish(Item.userPublicationName, function () {
  if (this.userId) {
    return Item.collection.find();
  }
  return this.ready();
});

Meteor.publish(Admin.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Admin.collection.find({ owner: username });
  }
  return this.ready();
});

// Admin-level publication.
// If logged in and with admin role, then publish all documents from all users. Otherwise publish nothing.
Meteor.publish(Stuffs.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Stuffs.collection.find();
  }
  return this.ready();
});

Meteor.publish(Item.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Item.collection.find();
  }
  return this.ready();
});

Meteor.publish(Admin.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Admin.collection.find();
  }
  return this.ready();
});

// alanning:roles publication
// Recommended code to publish roles for each user.
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});

// User-level publication.
// If logged in, then publish documents owned by this user. Otherwise publish nothing.
Meteor.publish(Notes.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Notes.collection.find({ owner: username });
  }
  return this.ready();
});