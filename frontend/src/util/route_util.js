import React from "react";
import { connect } from "react-redux";
import { Route, Redirect, withRouter } from "react-router-dom";

const Auth = ({ component: Component, path, loggedIn, exact }) => (
  <Route
    path={path}
    exact={exact}
    render={props =>

      // MODIFY redirect to
      !loggedIn ? <Component {...props} /> : <Redirect to="/events" />
    }
  />
);

const Protected = ({ component: Component, loggedIn, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      loggedIn ? <Component {...props} /> : <Redirect to="/login" />
    }
  />
);

const NewUser = ({ component: Component, loggedIn, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      loggedIn ? <Redirect to="/login" /> : <Component {...props} />
    }
  />
);

const mapStateToProps = state => ({ loggedIn: state.session.isAuthenticated });

export const AuthRoute = withRouter(connect(mapStateToProps)(Auth));

export const ProtectedRoute = withRouter(connect(mapStateToProps)(Protected));

export const NewUserRoute = withRouter(connect(mapStateToProps)(NewUser));