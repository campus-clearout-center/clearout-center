import React from 'react';
import { Image, Card, Button, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

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
        <Card.Content>
          <Card.Header>Reason for report:</Card.Header>
          {this.props.reports.reason}
        </Card.Content>
        <Card.Content>
          <Button as={Link} to={`/deletereport/${this.props.reports._id}`} icon labelPosition='left' color='red' id='delete-report-button'>
            <Icon name='exclamation triangle' />
            Delete Report
          </Button>
        </Card.Content>
      </Card>
    );
  }
}

// Require a document to be passed to this component.
Reports.propTypes = {
  reports: PropTypes.object.isRequired,
  currentUser: PropTypes.string.isRequired,
};

const ReportsContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(Reports);

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(ReportsContainer);
