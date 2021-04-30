import React from 'react';
import { Button, Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class ListItem extends React.Component {
  render() {
    return (
      <Table.Row>
        <Table.Cell>{this.props.item.itemName}</Table.Cell>
        <Table.Cell>${this.props.item.price}</Table.Cell>
        <Table.Cell>{this.props.item.description}</Table.Cell>
        <Table.Cell>{this.props.item.buyer}</Table.Cell>
        <Table.Cell>
          {this.props.currentUser === this.props.item.owner ? (
            <Link to={`/edititem/${this.props.item._id}`} id='editItem'>Edit</Link>
          ) : (<Button as={Link} to={`/offer/${this.props.item._id}`} primary id='offer'>Offer</Button>)
          }
        </Table.Cell>
      </Table.Row>
    );
  }
}

// Require a document to be passed to this component.
ListItem.propTypes = {
  item: PropTypes.shape({
    itemName: PropTypes.string,
    price: PropTypes.number,
    description: PropTypes.string,
    buyer: PropTypes.string,
    owner: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
  currentUser: PropTypes.string.isRequired,
};

const ListItemContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(ListItem);

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(ListItemContainer);
