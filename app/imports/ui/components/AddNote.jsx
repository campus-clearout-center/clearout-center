import React from 'react';
import { Grid, Segment, Header, Rating } from 'semantic-ui-react';
import { AutoForm, ErrorsField, SubmitField, TextField, SelectField, NumField, HiddenField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Item } from '../../api/item/Item';
import { Profiles } from '../../api/profile/Profiles';
import { Notes } from '../../api/note/Notes';

// Create a schema to specify the structure of the data to appear in the form.

const bridge = new SimpleSchema2Bridge(Notes.schema);

/** Renders the Page for adding a document. */
class AddNote extends React.Component {

  // On submit, insert the data.
  submit(data, formRef) {
    const { note, contactId } = data;
    const owner = Meteor.user().username;
    // const firstName = this.props.profile.firstName;
    // const lastName = this.props.profile.lastName;
    Notes.collection.insert({ note, contactId, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'success');
          formRef.reset();
        }
      });
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  render() {
    let fRef = null;
    return (
      <Grid container centered id='add-note'>
        <Grid.Column>
          <Header as="h2" textAlign="center" inverted>Review</Header>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
            <Segment>
              <Segment>
                <Rating maxRating={5} clearable />
                <TextField label="Add a review" name='note'/>
                <SubmitField value='Submit'/>
                <ErrorsField/>
                <HiddenField name='owner' value={this.props.owner}/>
                <HiddenField name='contactId' value={this.props.contactId}/>
              </Segment>
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

AddNote.propTypes = {
  profile: PropTypes.object,
  ready: PropTypes.bool.isRequired,
  owner: PropTypes.string.isRequired,
  contactId: PropTypes.string.isRequired,
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
})(AddNote);
