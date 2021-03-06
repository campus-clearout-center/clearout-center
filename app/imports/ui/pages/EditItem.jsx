import React from 'react';
import { Grid, Loader, Header, Segment } from 'semantic-ui-react';
import swal from 'sweetalert';
import { AutoForm, ErrorsField, HiddenField, NumField, SelectField, SubmitField, TextField, LongTextField } from 'uniforms-semantic';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Item } from '../../api/item/Item';

const bridge = new SimpleSchema2Bridge(Item.schema);

/** Renders the Page for editing a single document. */
class EditItem extends React.Component {

  // On successful submit, insert the data.
  submit(data) {
    const { firstName, lastName, address, itemName, image, price, description, details, label, _id } = data;
    Item.collection.update(_id, { $set: { firstName, lastName, address, itemName, image, price, details, description, label } }, (error) => (error ?
      swal('Error', error.message, 'error') :
      swal('Success', 'Item updated successfully', 'success')));
  }

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  renderPage() {
    return (
      <Grid container centered id='editItem'>
        <Grid.Column>
          <Header as="h2" textAlign="center" inverted>Edit Item</Header>
          <AutoForm schema={bridge} onSubmit={data => this.submit(data)} model={this.props.doc}>
            <Segment>
              <TextField name='itemName' id='edit-itemName'/>
              <TextField name='address' id='edit-address'/>
              <TextField name='image' id='edit-image'/>
              <NumField name='price' id='edit-price'/>
              <LongTextField name='details' id='edit-details'/>
              <SelectField name='description' id='edit-description'/>
              <SelectField name='label' id='edit-label'/>
              <SubmitField value='Submit' id='edit-submit'/>
              <ErrorsField/>
              <HiddenField name='firstName' />
              <HiddenField name='lastName' />
              <HiddenField name='owner' />
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

// Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use.
EditItem.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Item.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the document
  const doc = Item.collection.findOne(documentId);
  return {
    doc,
    ready,
  };
})(EditItem);
