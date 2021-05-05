import React from 'react';
import { Header, Container, Grid, Button, Card } from 'semantic-ui-react';
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
            <Header size='huge' id='landing-page' style={{
              fontSize: '4em',
              fontWeight: 'normal',
              textShadow: '2px 2px #000000',
            }} inverted>Welcome to Campus Clearout Center</Header>
            <Header as={'h3'} inverted style={{
              textShadow: '2px 2px #000000',
            }}>UH Manoa online thrift store. We want to promote recycling by giving the UH community a safe and secure online store to buy and sell your old things.</Header>
            {this.props.currentUser === '' ? [
              <Link to={'signin'} key='login' id='login-button'>
                <Button>Log In</Button>
              </Link>,
              <Link to={'signup'} key='register' id='signup-button'>
                <Button>Register</Button>
              </Link>]
              : (
                <Card.Group centered>
                  <Card>
                    <Card.Content>
                      <Card.Header content='Sell Item' />
                      <Card.Description content='By pressing the "sell item" menu button you will be able to post an item
                            using an item name, an address to be picked up at, an image, price, a description, and a label' />
                    </Card.Content>
                  </Card>
                  <Card>
                    <Card.Content>
                      <Card.Header content='Catalog' />
                      <Card.Description content='You can browse through items being sold through the "catalog" which is
                            sorted by the label it is given, or it can be viewed through "All items in store," an item can then
                            be offered which will share the user&apos;s email with the poster ' />
                    </Card.Content>
                  </Card>
                  <Card>
                    <Card.Content>
                      <Card.Header content='Profile Page' />
                      <Card.Description content='Your profile can be accessed by pressing your email in the top-right corner
                             and then pressing profile. You can then see your information, posted items and reviews.' />
                    </Card.Content>
                  </Card>
                </Card.Group>
              )
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
