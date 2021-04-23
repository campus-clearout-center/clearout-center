import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Card, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import Items from '../components/Items';
import { Item } from '../../api/item/Item';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListItems extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    console.log(this.props.items.filter((item) => (item.label === 'Books')));
    return (
      <Container>
        <Header as="h2" textAlign="center" inverted>List Items</Header>
        <Card.Group>
          {this.props.items.filter((item) => (item.label === 'Books')).map((item, index) => <Items key={index} items={item}/>)}

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
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Stuff documents
  const items = Item.collection.find({}).fetch();
  return {
    items,
    ready,
  };
})(ListItems);
