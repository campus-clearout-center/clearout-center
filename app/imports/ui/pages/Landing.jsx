import React from 'react';
import { Header, Container, Grid, Button } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
      <Container fluid className='grad-background'>
        <Grid columns={1} textAlign={'center'}>
          <Grid.Column>
            <Header id='landing-page' as={'h1'} inverted>Welcome to Campus Clearout Center</Header>
            <p>UH Manoa online thrift store. We want to promote recycling by giving the UH community a safe, secure online store to buy and sell your old things.</p>
            {this.props.currentUser === '' ? [
              <Link to={'signin'} key='login' id='login-button'>
                <Button>Log In</Button>
              </Link>,
              <Link to={'signup'} key='register' id='signup-button'>
                <Button>Register</Button>
              </Link>]
              : ('')
            }
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

Landing.propTypes = {
  currentUser: PropTypes.string,
};

const LandingContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(Landing);

export default withRouter(LandingContainer);
