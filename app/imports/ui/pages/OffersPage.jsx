import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Header, Container, Loader, Segment, Grid, Image, Divider } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, SubmitField } from 'uniforms-semantic';
import { Item } from '../../api/item/Item';

const bridge = new SimpleSchema2Bridge(Item.schema);

class OffersPage extends React.Component {

  submit(data) {
    const { firstName, lastName, address, itemName, image, price, description, label, _id } = data;
    const buyer = Meteor.user().username;
    Item.collection.update(_id, { $set: { firstName, lastName, address, itemName, image, price, description, label, buyer } }, (error) => (error ?
      swal('Error', error.message, 'error') :
      swal('Success', 'Item updated successfully', 'success')));
  }

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
              <p>Condition: {this.props.doc.description}</p>
              <p>Description: {this.props.doc.label}</p>
              <p>Address: {this.props.doc.address}</p>
              <p>Price: {this.props.doc.price}</p>
              <Divider/>
              <AutoForm schema={bridge} onSubmit={data => this.submit(data)} model={this.props.doc}>
                <Segment>
                  <p>You are intending on purchasing {this.props.doc.itemName}, your email address that you signed up with will be sent to their account to schedule an exchange</p>
                  <SubmitField value='Buy' id='purchase-item'/>
                </Segment>
              </AutoForm>
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
