import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import 'semantic-ui-css/semantic.css';
import { Roles } from 'meteor/alanning:roles';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Landing from '../pages/Landing';
import ProfilePage from '../pages/ProfilePage';
import ListItemsAdmin from '../pages/ListItemsAdmin';
import AddItem from '../pages/AddItem';
import EditItem from '../pages/EditItem';
import EditProfile from '../pages/EditProfile';
import NotFound from '../pages/NotFound';
import Signin from '../pages/Signin';
import Signup from '../pages/Signup';
import Signout from '../pages/Signout';
import ListItems from '../pages/ListItems';
import ReportUser from '../pages/ReportUser';
import ReportList from '../pages/ReportList';
import ListBooks from '../pages/ListBooks';
import ListServices from '../pages/ListServices';
import ListMisc from '../pages/ListMisc';
import OffersPage from '../pages/OffersPage';
import DeleteReport from '../pages/DeleteReport';
import DeleteItem from '../pages/DeleteItem';

/** Top-level layout component for this application. Called in imports/startup/client/startup.jsx. */
class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <NavBar/>
          <Switch>
            <Route exact path="/" component={Landing}/>
            <Route path="/signin" component={Signin}/>
            <Route path="/signup" component={Signup}/>
            <Route path="/signout" component={Signout}/>
            <ProtectedRoute path="/profile" component={ProfilePage}/>
            <AdminProtectedRoute path="/admin" component={ListItemsAdmin}/>
            <AdminProtectedRoute path="/reportlist" component={ReportList}/>
            <ProtectedRoute path="/list" component={ListItems}/>
            <ProtectedRoute path="/books" component={ListBooks}/>
            <ProtectedRoute path="/service" component={ListServices}/>
            <ProtectedRoute path="/misc" component={ListMisc}/>
            <ProtectedRoute path="/add" component={AddItem}/>
            <ProtectedRoute path="/edititem/:_id" component={EditItem}/>
            <ProtectedRoute path="/offer/:_id" component={OffersPage}/>
            <ProtectedRoute path="/edit/:_id" component={EditProfile}/>
            <ProtectedRoute path="/report/:_id" component={ReportUser}/>
            <ProtectedRoute path="/deletereport/:_id" component={DeleteReport}/>
            <ProtectedRoute path="/deleteitem/:_id" component={DeleteItem}/>
            <Route component={NotFound}/>
          </Switch>
          <Footer/>
        </div>
      </Router>
    );
  }
}

/**
 * ProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const isLogged = Meteor.userId() !== null;
      return isLogged ?
        (<Component {...props} />) :
        (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
        );
    }}
  />
);

/**
 * AdminProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login and admin role before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const AdminProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const isLogged = Meteor.userId() !== null;
      const isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');
      return (isLogged && isAdmin) ?
        (<Component {...props} />) :
        (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
        );
    }}
  />
);

// Require a component and location to be passed to each ProtectedRoute.
ProtectedRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  location: PropTypes.object,
};

// Require a component and location to be passed to each AdminProtectedRoute.
AdminProtectedRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  location: PropTypes.object,
};

export default App;
