import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    return (
      <footer className="footer-background">
        <Button basic inverted as={Link} to={'/contactus'} id='contactus-redirect'>
          Contact Us
        </Button>
      </footer>
    );
  }
}

export default Footer;
