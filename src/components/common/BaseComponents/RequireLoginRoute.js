import * as React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { isGrantedAny, isGrantedAll } from 'utils/authUtils';
// import sS from 'constant.js';
import store from 'redux/store/index'
const RequireLoginRoute = ({ path, component: Component, isAny, permissions, render, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (!store.getState().auth.isAuthenticated)
          return (
            <Redirect
              to={{
                pathname: '/',
                state: { from: props.location },
              }}
            />
          );

        if (permissions.length > 0 && !
          ((!isAny && isGrantedAll(permissions))
            || (isAny && isGrantedAny(permissions))
          )) {
          return (
            <Redirect
              to={{
                pathname: '/',
                state: { from: props.location },
              }}
            />
          );
        }
 
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default RequireLoginRoute;
