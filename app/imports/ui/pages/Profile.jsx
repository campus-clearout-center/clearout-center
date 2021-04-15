import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Header } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Profiles } from '../../api/profile/Profiles';


class ProfilePage extends React.Component {
  // If subs are loaded then render page
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>
  }

  // render page method
  renderPage() {
    <Header as='h2'>props.profile.</Header>
  }
}

// Ready proptype for Profiles pages
ProfilePage.propTypes = {
  profile: PropTypes.object.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Metoer data to React Component
export default withTracker(() => {
  // Populate mini mongo with collection before render()
  const sub = Meteor.subscribe(Profiles.userPublicationName);
  // Get the profile documents
  const contacts = Contacts.collection.find({}).fethc();
  // If subsciption went through successfully we can return ready
  return {
    ready: sub.ready(),
  };
});
