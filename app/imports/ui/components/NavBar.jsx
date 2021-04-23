import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu, Dropdown, Image } from 'semantic-ui-react';
import { Roles } from 'meteor/alanning:roles';

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
class NavBar extends React.Component {
  render() {
    return (
      <Menu className='borderless topmenu' attached="top" borderless inverted>
        <div className='left-space'><Menu.Item as={NavLink} activeClassName="" exact to="/">
          <Image src='https://cdn.discordapp.com/attachments/827753538145746977/831292462563328000/New_Project_1.png'
            size='small'/>
        </Menu.Item></div>
        {this.props.currentUser ? (
          [<Menu.Item as={NavLink} activeClassName="active" exact to="/add" key='add'>Sell Item</Menu.Item>,
            <Dropdown key={'list'} item text={'Catalog'}>
              <Dropdown.Menu>
                <Dropdown.Item as={NavLink} activeClassName="active" exact to="/list" key='list' >Appliances</Dropdown.Item>
                <Dropdown.Item as={NavLink} activeClassName="active" exact to="/books" key='books' >Textbooks</Dropdown.Item>
                <Dropdown.Item as={NavLink} activeClassName="active" exact to="/service" key='service' >Services</Dropdown.Item>
                <Dropdown.Item as={NavLink} activeClassName="active" exact to="/misc" key='misc' >Miscellaneous</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>,
          ]
        ) : ''}
        {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
          [
            <Menu.Item as={NavLink} activeClassName="active" exact to="/admin" key='admin'>Admin</Menu.Item>,
            <Menu.Item as={NavLink} activeClassName="active" exact to="/reportlist" key='report list'>Report List</Menu.Item>,
          ]
        ) : ''}
        <Menu.Item position="right">
          {this.props.currentUser === '' ? ('') : (
            <Dropdown id="navbar-current-user" text={this.props.currentUser} pointing="top right" icon={'user'}>
              <Dropdown.Menu>
                <Dropdown.Item id="navbar-profile" icon="user" text="Profile" as={NavLink} exact to="/profile"/>
                <Dropdown.Item id="navbar-sign-out" icon="sign out" text="Sign Out" as={NavLink} exact to="/signout"/>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </Menu.Item>
      </Menu>
    );
  }
}

// Declare the types of all properties.
NavBar.propTypes = {
  currentUser: PropTypes.string,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
const NavBarContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(NavBar);

// Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter
export default withRouter(NavBarContainer);
