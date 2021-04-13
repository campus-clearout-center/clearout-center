import React from 'react';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    return (
      <footer>
        <div className="footer-background">
          <hr />
          <p>Contact Us</p>
        </div>
      </footer>
    );
  }
}

export default Footer;
