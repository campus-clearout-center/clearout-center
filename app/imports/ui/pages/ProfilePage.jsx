import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Header, Container } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Profiles } from '../../api/profile/Profiles';

class ProfilePage extends React.Component {
  // If subs are loaded then render page
  render() {
    return (
        <Container>
        <Header as='h2'> Profile Page</Header>
        </Container>
    );
  }
}
// render page method
/** renderPage() {
    return (
      <Container>
        <Header as='h2'>Profile Page</Header>
        <Header as='h3'>{this.props.profile.firstName} {this.props.profile.lastName}</Header>
      </Container>

    );
  }
} */

// Ready proptype for Profiles pages
ProfilePage.propTypes = {
  profile: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Metoer data to React Component
export default withTracker(() => {
  // Populate mini mongo with collection before render()
  const sub = Meteor.subscribe(Profiles.userPublicationName);
  // check if subs ready
  const ready = sub.ready();
  // Get the profile documents
  const profile = Profiles.collection.find({}).fetch();
  // If subsciption went through successfully we can return ready
  return {
    profile,
    ready,
  };
})(ProfilePage);
