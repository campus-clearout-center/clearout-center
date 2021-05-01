import React from 'react';
import { Image, Card, Label, Button, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Profiles } from '../../api/profile/Profiles';

function getOwnerId(owner) {
  const username = Profiles.collection.findOne({ owner });
  return username._id;
}

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class ListAll extends React.Component {
  render() {
    const ownerid = getOwnerId(this.props.items.owner);
    return (
      <Card centered>
        <Image src={this.props.items.image} size='small' centered />
        <Card.Content>
          <Card.Header>{this.props.items.itemName}</Card.Header>
          <Card.Meta>
            <Link id='profile-link' to={`/profile/${ownerid}`}> <span>{this.props.items.firstName} {this.props.items.lastName}</span> </Link>
          </Card.Meta>
          <Card.Description>
            {this.props.items.description}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Card.Header>${this.props.items.price}<Button as={Link} to={`/offer/${this.props.items._id}`} primary floated='right' id='offer'>Offer</Button> </Card.Header>
        </Card.Content>
        <Card.Content extra>
          <Label>
            {this.props.items.label}
          </Label>
        </Card.Content>
        {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
          [
            <Card.Content key='delete-item-button'>
              <Button as={Link} to={`/deleteitem/${this.props.items._id}`} icon labelPosition='left' color='red' id='delete-item-button'>
                <Icon name='exclamation triangle' />
            Delete Item
              </Button>
            </Card.Content>,
          ]
        ) : ''}
      </Card>
    );
  }
}

// Require a document to be passed to this component.
ListAll.propTypes = {
  items: PropTypes.object.isRequired,
  profiles: PropTypes.array,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(ListAll);
