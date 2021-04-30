import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Card, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import Items from '../components/Items';
import { Item } from '../../api/item/Item';
import { Profiles } from '../../api/profile/Profiles';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListItems extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    console.log(this.props.items.filter((item) => (item.label === 'Appliances')));
    return (
      <Container id='list-items'>
        <Header as="h2" textAlign="center" inverted id='listitems-page'>List Items</Header>
        <Card.Group>
          {this.props.items.filter((item) => (item.label === 'Appliances')).map((item, index) => <Items key={index} items={item}/>)}
        </Card.Group>
      </Container>
    );
  }
}

// Require an array of Stuff documents in the props.
ListItems.propTypes = {
  items: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Item.userPublicationName);
  const subscription2 = Meteor.subscribe(Profiles.pubPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready() && subscription2.ready();
  // Get the Stuff documents
  const items = Item.collection.find({}).fetch();
  const profiles = Profiles.collection.find({}).fetch();
  return {
    items,
    ready,
    profiles,
  };
})(ListItems);
