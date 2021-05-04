import React from 'react';
import { Container, Grid, Card, Header, Image, Segment } from 'semantic-ui-react';

/** A simple static component to render some text for the ContactUs page. */
class ContactUs extends React.Component {
  render() {
    return (
      <Container>
        <Header textAlign={'center'} inverted size='huge' id='contactus-page'>Contact Us</Header>
        <Grid columns={3} textAlign={'center'}>
          <Grid.Column>
            <Grid.Row>
              <Card>
                <Card.Content>
                  <Image
                    floated='right'
                    size='mini'
                    src='https://avatars.githubusercontent.com/u/76574420?v=4'
                  />
                  <Card.Header>Benny Trieu</Card.Header>
                  <Card.Meta>CCC Developer</Card.Meta>
                  <Card.Description>
                    https://github.com/bennytrieu
                  </Card.Description>
                </Card.Content>
              </Card>
            </Grid.Row>
            <Grid.Row>
              <Card>
                <Card.Content>
                  <Image
                    floated='right'
                    size='mini'
                    src='https://avatars.githubusercontent.com/u/72054052?v=4'
                  />
                  <Card.Header>Chase Lee</Card.Header>
                  <Card.Meta>CCC Developer</Card.Meta>
                  <Card.Description>
                    https://github.com/Chase-Lee-ui
                  </Card.Description>
                </Card.Content>
              </Card>
            </Grid.Row>
          </Grid.Column>
          <Grid.Column>
            <Grid.Row>
              <Card>
                <Card.Content>
                  <Image
                    floated='right'
                    size='mini'
                    src='https://avatars.githubusercontent.com/u/49466672?v=4'
                  />
                  <Card.Header>Skyler Kimura</Card.Header>
                  <Card.Meta>CCC Developer</Card.Meta>
                  <Card.Description>
                    https://github.com/skimura1
                  </Card.Description>
                </Card.Content>
              </Card>
            </Grid.Row>
            <Grid.Row>
              <Card>
                <Card.Content>
                  <Image
                    floated='right'
                    size='mini'
                    src='https://avatars.githubusercontent.com/u/70232486?v=4'
                  />
                  <Card.Header>Daphne Oh</Card.Header>
                  <Card.Meta>CCC Developer</Card.Meta>
                  <Card.Description>
                    https://github.com/daphneoh
                  </Card.Description>
                </Card.Content>
              </Card>
            </Grid.Row>
          </Grid.Column>
          <Grid.Column verticalAlign='middle'>
            <Header inverted>Campus Clearout Center Contact Info</Header>
            <Segment>
              <p>Open Source Code: https://github.com/campus-clearout-center</p>
              <p>Github.io website: https://campus-clearout-center.github.io/</p>
            </Segment>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

export default ContactUs;
