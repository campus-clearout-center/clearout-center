import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class ListItem extends React.Component {
  render() {
    return (
      <Table.Row>
        <Table.Cell>{this.props.item.itemName}</Table.Cell>
        <Table.Cell>{this.props.item.price}</Table.Cell>
        <Table.Cell>{this.props.item.description}</Table.Cell>
        <Table.Cell>{this.props.item.buyer}</Table.Cell>
        <Table.Cell>
          <Link to={`/edititem/${this.props.item._id}`}>Edit</Link>
        </Table.Cell>
      </Table.Row>
    );
  }
}

// Require a document to be passed to this component.
ListItem.propTypes = {
  item: PropTypes.shape({
    itemName: PropTypes.string,
    price: PropTypes.string,
    description: PropTypes.string,
    buyer: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(ListItem);
