import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Redirect } from 'react-router-dom';
import { Item } from '../../api/item/Item';
import { Admin } from '../../api/admin/Admin';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  address: String,
  itemName: String,
  image: String,
  price: String,
  description: String,
  label: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class DeleteItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = { email: '', password: '', error: '', redirectToReferer: false };
  }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  }

  // On submit, insert the data.
  delete(data) {
    const { _id } = data;
    Item.collection.remove(_id,
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Report successfully deleted', 'success');
          this.setState({ error: '', redirectToReferer: true });
        }
      });
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/admin' } };
    // if correct authentication, redirect to page instead of login screen
    if (this.state.redirectToReferer) {
      return <Redirect to={from}/>;
    }
    return (
      <Grid className='borderless middlemenu' container centered id='delete-item'>
        <Grid.Column>
          <Header as="h2" textAlign="center" inverted>Are you sure you want to delete this item?</Header>
          <AutoForm schema={bridge} onSubmit={data => this.delete(data)} model={this.props.doc}>
            <Segment>
              <TextField name='itemName' disabled/>
              <TextField name='address' disabled/>
              <TextField name='image' disabled/>
              <TextField name='price' disabled/>
              <TextField name='description' disabled/>
              <TextField name='label' disabled/>
              <SubmitField value='Delete' id='item-delete'/>
              <ErrorsField/>
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

DeleteItem.propTypes = {
  doc: PropTypes.object,
  location: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Stuff documents.
  const subscription2 = Meteor.subscribe(Admin.adminPublicationName);
  const subscription = Meteor.subscribe(Item.adminPublicationName);
  // const subscription2 = Meteor.subscribe(Admin.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready() && subscription2.ready();
  // Get the document
  // const doc = Admin.collection.findOne(documentId);
  const doc = Item.collection.findOne(documentId);
  return {
    // doc,
    doc,
    ready,
  };
})(DeleteItem);
