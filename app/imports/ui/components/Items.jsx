import React from 'react';
import { Image, Card, Label, Button, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Profiles } from '../../api/profile/Profiles';

function getOwnerId(owner) {
  const username = Profiles.collection.findOne({ owner });
  return username._id;
}

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Items extends React.Component {
  render() {
    const ownerid = getOwnerId(this.props.items.owner);
    return (
      <Card centered>
        <Image src={this.props.items.image} size='small' centered />
        <Card.Content>
          <Card.Header>{this.props.items.itemName}</Card.Header>
          <Card.Meta>
            <Link id='profile-link'to={`/profile/${ownerid}`}> <span>{this.props.items.firstName} {this.props.items.lastName}</span> </Link>
          </Card.Meta>
          <Card.Description>
            {this.props.items.description}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Card.Header>${this.props.items.price}
            {this.props.currentUser === this.props.items.owner ? ('') : (
              <Button as={Link} to={`/offer/${this.props.items._id}`} primary floated='right' id='offer'>Offer</Button>
            )
            }
          </Card.Header>
        </Card.Content>
        <Card.Content extra>
          <Label>
            {this.props.items.label}
          </Label>
        </Card.Content>
        {this.props.currentUser === this.props.items.owner ? (
          <Card.Content extra>
            <Link to={`/edititem/${this.props.items._id}`} id='editItem'>Edit</Link>
          </Card.Content>
        ) : ('')
        }
        <Card.Content extra>
          <Button size='mini' as={Link} to={`/report/${this.props.items._id}`} icon labelPosition='left' color='red' id='report-button'>
            <Icon name='exclamation triangle' />
            Report Item
          </Button>
          {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
            [
              <Button size='mini' as={Link} to={`/deleteitem/${this.props.items._id}`} icon labelPosition='left' color='red' id='delete-item-button' key='delete-item-button'>
                <Icon name='exclamation triangle' />
            Delete Item
              </Button>,
            ]
          ) : ''}
        </Card.Content>
      </Card>
    );
  }
}

// Require a document to be passed to this component.
Items.propTypes = {
  items: PropTypes.object.isRequired,
  currentUser: PropTypes.string.isRequired,
  profiles: PropTypes.array,
};

const ItemsContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(Items);

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(ItemsContainer);
