import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, SubmitField, TextField, SelectField, NumField, LongTextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Redirect } from 'react-router-dom';
import { Item } from '../../api/item/Item';
import { Profiles } from '../../api/profile/Profiles';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  address: String,
  itemName: String,
  image: String,
  price: String,
  details: String,
  description: { type: String, allowedValues: ['Never opened', 'Partially used', 'Still good'], defaultValue: 'Partially used' },
  label: { type: String, allowedValues: ['Appliances', 'Textbook', 'Service', 'Miscellaneous'] },
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class AddItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = { email: '', password: '', error: '', redirectToReferer: false };
  }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  }

  // On submit, insert the data.
  submit(data, formRef) {
    const { address, itemName, image, price, details, description, label } = data;
    const owner = Meteor.user().username;
    const firstName = this.props.profile.firstName;
    const lastName = this.props.profile.lastName;
    Item.collection.insert({ firstName, lastName, address, itemName, image, details, price, description, label, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Item added successfully', 'success');
          formRef.reset();
          this.setState({ error: '', redirectToReferer: true });
        }
      });
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  render() {
    let fRef = null;
    const { from } = this.props.location.state || { from: { pathname: '/listall' } };
    // if correct authentication, redirect to page instead of login screen
    if (this.state.redirectToReferer) {
      return <Redirect to={from}/>;
    }
    return (
      <Grid container centered id='add-item'>
        <Grid.Column>
          <Header as="h2" textAlign="center" inverted>Sell Item</Header>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
            <Segment>
              <TextField name='itemName' id='itemName-area'/>
              <TextField name='address' label='Address(Where to meet up)' id='address-area'/>
              <TextField name='image' label='Image Address' id='image-area'/>
              <NumField name='price' id='price-area'/>
              <SelectField name='description' id='description-area'/>
              <LongTextField name='details' id='details-area'/>
              <SelectField name='label' id='label-area'/>
              <SubmitField value='Submit' id='item-submit'/>
              <ErrorsField/>
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

AddItem.propTypes = {
  location: PropTypes.object,
  profile: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Metoer data to React Component
export default withTracker(() => {
  // Populate mini mongo with collection before render()
  const sub = Meteor.subscribe(Profiles.userPublicationName);
  // check if subs ready
  const ready = sub.ready();
  // Get the profile documents
  const profile = Profiles.collection.find().fetch()[0];
  // If subsciption went through successfully we can return ready
  return {
    profile,
    ready,
  };
})(AddItem);
