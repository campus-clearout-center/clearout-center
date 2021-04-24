import React from 'react';
import { Image, Card } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Reports extends React.Component {
  render() {
    return (
      <Card centered>
        <Image src={this.props.reports.image} size='small' centered />
        <Card.Content>
          <Card.Header>{this.props.reports.itemName}</Card.Header>
          <Card.Meta>
            <span>{this.props.reports.firstName} {this.props.reports.lastName}</span>
          </Card.Meta>
        </Card.Content>
        <Card.Content extra>
          {this.props.reports.reason}
        </Card.Content>
      </Card>
    );
  }
}

// Require a document to be passed to this component.
Reports.propTypes = {
  reports: PropTypes.object.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(Reports);