import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Header, Container, Loader, Segment, Grid, Image, Divider, Button } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Item } from '../../api/item/Item';

class OffersPage extends React.Component {

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // If subs are loaded then render page
  renderPage() {
    return (
      <Container>
        <Segment>
          <Header as='h1' textAlign="center">Offer for {this.props.doc.itemName}</Header>
          <Grid columns={2}>
            <Grid.Column width={6}>
              <Image src={this.props.doc.image}/>
            </Grid.Column>
            <Grid.Column>
              <p>Condition: {this.props.doc.condition}</p>
              <p>Description: {this.props.doc.description}</p>
              <p>Address: {this.props.doc.address}</p>
              <p>Price: {this.props.doc.price}</p>
              <Divider/>
              <Button icon color='blue'>Buy</Button>
            </Grid.Column>
          </Grid>
        </Segment>
      </Container>
    );
  }
}

// Ready proptype for Profiles pages
OffersPage.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Metoer data to React Component
export default withTracker(({ match }) => {
  const documentId = match.params._id;
  // Populate mini mongo with collection before render()
  const sub = Meteor.subscribe(Item.userPublicationName);
  // check if subs ready
  const ready = sub.ready();
  // Get the profile documents
  const doc = Item.collection.findOne(documentId);
  // If subsciption went through successfully we can return ready
  return {
    doc,
    ready,
  };
})(OffersPage);
