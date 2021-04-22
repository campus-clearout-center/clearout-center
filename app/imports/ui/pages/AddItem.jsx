import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, SubmitField, TextField, SelectField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Item } from '../../api/item/Item';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  firstName: String,
  lastName: String,
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
    const { firstName, lastName, address, itemName, image, price, description, label } = data;
    const owner = Meteor.user().username;
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
      <Grid container centered>
        <Grid.Column>
          <Header as="h2" textAlign="center">Add Item</Header>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
            <Segment>
              <TextField name='firstName'/>
              <TextField name='lastName'/>
              <TextField name='itemName'/>
              <TextField name='address'/>
              <TextField name='image'/>
              <TextField name='price'/>
              <SelectField name='description'/>
              <SelectField name='label'/>
              <SubmitField value='Submit'/>
              <ErrorsField/>
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

export default AddItem;
