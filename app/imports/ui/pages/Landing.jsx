import React from 'react';
import { Grid, Icon, Header } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
      <div className='uh-background'>
        <Grid container centered stackable columns={3}>

          <Grid.Column textAlign='center'>
            <Header as='h1' inverted>Welcome to Campus Clearout Center</Header>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default Landing;
