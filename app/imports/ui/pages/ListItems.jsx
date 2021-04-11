import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Card, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Stuffs } from '../../api/stuff/Stuff';
import Items from '../components/Items';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListItems extends React.Component {

  items = [{
    firstName: 'Philip', lastName: 'Johnson', address: 'POST 307, University of Hawaii', itemName: 'Refrigerator',
    image: 'https://images-na.ssl-images-amazon.com/images/I/61tGvBnQW9L._AC_SL1200_.jpg', price: '100.00$',
    description: 'Partially used mini fridge', label: 'Appliances',
  },
  ];

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    return (
      <Container>
        <Header as="h2" textAlign="center" inverted>List Items</Header>
        <Card.Group>
          {this.items.map((items, index) => <Items key={index} items={items}/>)}
        </Card.Group>
      </Container>
    );
  }
}

// Require an array of Stuff documents in the props.
ListItems.propTypes = {
  stuffs: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Stuffs.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Stuff documents
  const stuffs = Stuffs.collection.find({}).fetch();
  return {
    stuffs,
    ready,
  };
})(ListItems);
