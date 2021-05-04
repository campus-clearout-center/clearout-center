import React from 'react';
import { Feed, Rating, Container } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Note extends React.Component {
  render() {
    return (
      <Container>
        <Feed.Event>
          <Feed.Content>
            <Feed.Meta>
              <Rating maxRating={5} clearable/>
            </Feed.Meta>
            <Feed.User>
              {this.props.note.owner}
            </Feed.User>
            <Feed.Extra>
              {this.props.note.note}
            </Feed.Extra>
          </Feed.Content>
        </Feed.Event>
      </Container>
    );
  }
}

// Require a document to be passed to this component.
Note.propTypes = {
  note: PropTypes.object.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(Note);
