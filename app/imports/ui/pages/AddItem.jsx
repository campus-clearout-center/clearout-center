import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, SubmitField, TextField, SelectField, NumField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Item } from '../../api/item/Item';
import { Profiles } from '../../api/profile/Profiles';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  address: String,
  itemName: String,
  image: String,
  price: String,
  description: { type: String, allowedValues: ['Never opened', 'Partially used', 'Still good'], defaultValue: 'Partially used' },
  label: { type: String, allowedValues: ['Appliances', 'Textbook', 'Service'] },
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class AddItem extends React.Component {

  // On submit, insert the data.
  submit(data, formRef) {
    const { address, itemName, image, price, description, label } = data;
    const owner = Meteor.user().username;
    const firstName = this.props.profile.firstName;
    const lastName = this.props.profile.lastName;
    Item.collection.insert({ firstName, lastName, address, itemName, image, price, description, label, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Item added successfully', 'success');
          formRef.reset();
        }
      });
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  render() {
    let fRef = null;
    return (
      <Grid container centered id='add-item'>
        <Grid.Column>
          <Header as="h2" textAlign="center" inverted>Sell Item</Header>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
            <Segment>
              <TextField name='itemName' id='itemName-area'/>
              <TextField name='address' id='address-area'/>
              <TextField name='image' id='image-area'/>
              <NumField name='price' id='price-area'/>
              <SelectField name='description' id='description-area'/>
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
