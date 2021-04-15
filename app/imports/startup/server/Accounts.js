import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';
import { Profiles } from '../../api/profile/Profiles';

/* eslint-disable no-console */
/** Create user based off of the email password role and uhid */
function createUser(email, password, role) {
  console.log(`  Creating user ${email}.`);
  const userID = Accounts.createUser({
    username: email,
    password: password,
    email: email,
  });
  if (role === 'admin') {
    Roles.createRole(role, { unlessExists: true });
    Roles.addUsersToRoles(userID, 'admin');
  }
}

// Defines a new user and associates the profile with the user
function addProfile({ username, email, firstName, lastName, bio, picture, role, password }) {
  console.log(`Defining profile ${email}`);
  // Define the user in the Meteor accounts package
  createUser(email, password, role);
  // Create the profile
  Profiles.collection.insert({ username, email, firstName, lastName, bio, picture, role, password });
}

// When running app for first time, pass a settings file to set up a default user account.
if (Meteor.users.find().count() === 0) {
  if (Meteor.settings.defaultProfiles) {
    console.log('Creating the default Profile(s)');
    Meteor.settings.defaultProfiles.map(profile => addProfile(profile));
  } else {
    console.log('Cannot initialize the database!  Please invoke meteor with a settings file.');
  }
}
