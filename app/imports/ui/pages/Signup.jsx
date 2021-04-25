import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { Container, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import { AutoForm, ErrorField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Accounts } from 'meteor/accounts-base';
import { Profiles } from '../../api/profile/Profiles';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);
/**
 * Signup component is similar to signin component, but we create a new user instead.
 */
class Signup extends React.Component {
  /* initialize state fields. */
  constructor(props) {
    super(props);
    this.state = { error: '', redirectToReferer: false };
  }

  /* Handle Signup submission. Create user account and a profile entry, then redirect to the edit profile */
  submit = (data) => {
    const { firstName, lastName, email, password } = data;
    if (!email.endsWith('@hawaii.edu')) {
      this.setState({ error: 'Please enter a valid University of Hawaii email address!' });
    } else { this.setState({ error: '' }); }
    if (this.state.error === '') {
      Accounts.createUser({ email, username: email, password }, (err) => {
        if (err) {
          this.setState({ error: err.reason });
        } else {
          Profiles.collection.insert({ email, username: email, firstName, lastName, owner: email }, (err2) => {
            if (err2) {
              this.setState({ error: err2.reason });
            } else {
              swal('Success', 'Profiles created successfully', 'success');
              this.setState({ error: '', redirectToReferer: true });
            }
          });
        }
      });
    }
  }

  /* Display the signup form. Redirect to add page after successful registration and login. */
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/profile' } };
    // if correct authentication, redirect to from: page instead of signup screen
    if (this.state.redirectToReferer) {
      return <Redirect to={from}/>;
    }
    return (
      <Container id="signup-page">
        <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
          <Grid.Column>
            <Header as="h2" textAlign="center" inverted>
              Register your account
            </Header>
            <AutoForm schema={bridge} onSubmit={info => this.submit(info)}>
              <Segment stacked>
                <TextField
                  label="First Name"
                  id="signup-form-firstName"
                  icon="user"
                  name="firstName"
                  type="text"
                  placeholder="John"
                />
                <ErrorField name="firstName">
                  <span>Please enter your first name!</span>
                </ErrorField>
                <TextField
                  label="Last Name"
                  id="signup-form-lastName"
                  icon="user"
                  name="lastName"
                  type="text"
                  placeholder="Doe"
                />
                <ErrorField name="lastName">
                  <span>Please enter your last name!</span>
                </ErrorField>
                <TextField
                  label="Email"
                  id="signup-form-email"
                  icon="mail"
                  name="email"
                  type="email"
                  placeholder="johndoe@hawaii.edu"
                />
                <ErrorField name="email">
                  <span>Please enter an email address!</span>
                </ErrorField>
                <TextField
                  label="Password"
                  id="signup-form-password"
                  icon="lock"
                  name="password"
                  placeholder="Password"
                  type="password"
                />
                <ErrorField name="password">
                  <span>Please enter a password</span>
                </ErrorField>
                <Form.Button id="signup-form-submit" content="Submit"/>
              </Segment>
            </AutoForm>
            <Message>
              Already have an account? Login <Link to="/signin">here</Link>
            </Message>
            {this.state.error === '' ? (
              ''
            ) : (
              <Message
                error
                header="Registration was not successful"
                content={this.state.error}
              />
            )}
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

/* Ensure that the React Router location object is available in case we need to redirect. */
Signup.propTypes = {
  location: PropTypes.object,
};

export default Signup;
