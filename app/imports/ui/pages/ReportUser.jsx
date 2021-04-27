import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Item } from '../../api/item/Item';
import { Admin } from '../../api/admin/Admin';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  firstName: String,
  lastName: String,
  itemName: String,
  image: String,
  reason: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class ReportUser extends React.Component {

  // On submit, insert the data.
  submit(data) {
    const { firstName, lastName, itemName, image, reason } = data;
    const owner = Meteor.user().username;
    Admin.collection.insert({ firstName, lastName, itemName, image, reason, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Report sent successfully', 'success');
        }
      });
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  render() {
    return (
      <Grid className='borderless middlemenu' container centered id='report-item'>
        <Grid.Column>
          <Header as="h2" textAlign="center" inverted>Report the user</Header>
          <AutoForm schema={bridge} onSubmit={data => this.submit(data)} model={this.props.doc}>
            <Segment>
              <TextField name='firstName' disabled/>
              <TextField name='lastName' disabled/>
              <TextField name='itemName' disabled/>
              <TextField name='image' disabled/>
              <TextField name='reason' id='report-area'/>
              <SubmitField value='Submit' id='report-submit'/>
              <ErrorsField/>
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

ReportUser.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Item.userPublicationName);
  // const subscription2 = Meteor.subscribe(Admin.userPublicationName);
  const subscription2 = Meteor.subscribe(Admin.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready() && subscription2.ready();
  // Get the document
  const doc = Item.collection.findOne(documentId);
  const doc2 = Admin.collection.findOne(documentId);
  return {
    doc,
    doc2,
    ready,
  };
})(ReportUser);
