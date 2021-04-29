import React from 'react';
import { Image, Card, Label, Button, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class ItemAdmin extends React.Component {
  render() {
    return (
      <Card centered>
        <Image src={this.props.items.image} size='small' centered />
        <Card.Content>
          <Card.Header>{this.props.items.itemName}</Card.Header>
          <Card.Meta>
            <span>{this.props.items.firstName} {this.props.items.lastName}</span>
          </Card.Meta>
          <Card.Description>
            {this.props.items.description}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Card.Header>${this.props.items.price}<Button primary floated='right'>Offer</Button> </Card.Header>
        </Card.Content>
        <Card.Content extra>
          <Label>
            {this.props.items.label}
          </Label>
        </Card.Content>
        <Card.Content extra>
          <p>{this.props.items.owner}</p>
        </Card.Content>
        <Card.Content>
          <Button as={Link} to={`/deleteitem/${this.props.items._id}`} icon labelPosition='left' color='red' id='delete-item-button'>
            <Icon name='exclamation triangle' />
            Delete Item
          </Button>
        </Card.Content>
      </Card>
    );
  }
}

// Require a document to be passed to this component.
ItemAdmin.propTypes = {
  items: PropTypes.object.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(ItemAdmin);
