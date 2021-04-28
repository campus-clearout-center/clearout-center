import React from 'react';
import { Feed, Rating } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Note extends React.Component {
  render() {
    return (
      <Feed.Event >
        <Feed.Content>
          <Feed.Summary>
            <Rating maxRating={5} clearable />
          </Feed.Summary>
          <Feed.Extra>
            {this.props.note.note}
          </Feed.Extra>
        </Feed.Content>
      </Feed.Event>
    );
  }
}

// Require a document to be passed to this component.
Note.propTypes = {
  note: PropTypes.object.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(Note);
