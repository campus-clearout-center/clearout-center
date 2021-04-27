import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Header, Container, Loader, Segment, Grid, Image, Divider, Icon, Table } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Profiles } from '../../api/profile/Profiles';
import { Item } from '../../api/item/Item';
import ListItem from '../components/ListItem';

class ProfilePage extends React.Component {

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // If subs are loaded then render page
  renderPage() {
    // console.log(this.props.profile);
    return (
      <Container>
        <Segment>
          <Header as='h1' textAlign="center" id='profile-page'>Profile Page</Header>
          <Grid columns={2}>
            <Grid.Column width={6}>
              <Link id={'edit-profile'} to={`/edit/${this.props.profile._id}`}><Icon name='pencil alternate'/>Edit</Link>
              <Image src={this.props.profile.picture}/>
            </Grid.Column>
            <Grid.Column>
              <Header as='h2' textAlign='left'>{this.props.profile.firstName} {this.props.profile.lastName}</Header>
              <p><Icon name='user'/>Username: {this.props.profile.username}</p>
              <Divider horizontal>Information</Divider>
              <p><Icon name='mail'/>Email: {this.props.profile.email}</p>
              <p><Icon name='address card'/>Bio: {this.props.profile.bio}</p>
              <Table celled>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell singleLine>Item Name</Table.HeaderCell>
                    <Table.HeaderCell>Price</Table.HeaderCell>
                    <Table.HeaderCell>Description</Table.HeaderCell>
                    <Table.HeaderCell></Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {this.props.item.map((item) => <ListItem key={item._id} item={item} />)}
                </Table.Body>
              </Table>
            </Grid.Column>
          </Grid>
        </Segment>
      </Container>
    );
  }
}

// Ready proptype for Profiles pages
ProfilePage.propTypes = {
  item: PropTypes.array.isRequired,
  profile: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Metoer data to React Component
export default withTracker(() => {
  // Populate mini mongo with collection before render()
  const sub = Meteor.subscribe(Profiles.userPublicationName);
  const sub2 = Meteor.subscribe(Item.ownerPublicationName);
  // check if subs ready
  const ready = sub.ready() && sub2.ready();
  // Get the profile documents
  const profile = Profiles.collection.find().fetch()[0];
  const item = Item.collection.find().fetch();
  // If subsciption went through successfully we can return ready
  return {
    item,
    profile,
    ready,
  };
})(ProfilePage);
