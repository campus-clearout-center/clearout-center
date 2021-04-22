import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Card, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
// import Items from '../components/Items';
// import { Item } from '../../api/report/Item';
import Reports from '../components/Reports';
import { Admin } from '../../api/admin/Admin';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ReportList extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    console.log(this.props.report.length);
    return (
      <Container>
        <Header as="h2" textAlign="center" inverted>The List of User Reports</Header>
        <Card.Group>
          {this.props.report.map((report, index) => <Reports key={index} reports={report}/>)}
        </Card.Group>
      </Container>
    );
  }
}

// Require an array of Stuff documents in the props.
ReportList.propTypes = {
  report: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Admin.adminPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Stuff documents
  const report = Admin.collection.find({}).fetch();
  return {
    report,
    ready,
  };
})(ReportList);
