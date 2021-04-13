import React from 'react';
import { Header, Container, Grid, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
      <Container fluid className='grad-background'>
        <Grid middle aligned columns={1} textAlign={'center'}>
          <Grid.Column><Header as={'h1'} inverted>Welcome to Campus Clearout Center</Header>
            <p inverted>UH Manoa online thrift store. We want to promote reclycling by giving the UH community a safe, secure online store to buy and sell your old things.</p>
            <div>
              <Link to={'signin'}>
                <Button>Log In</Button>
              </Link>
              <Link to={'signup'}>
                <Button>Register</Button></Link>
            </div>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

export default Landing;
