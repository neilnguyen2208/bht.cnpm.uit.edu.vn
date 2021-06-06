import * as React from 'react';
import { Redirect, Route } from 'react-router-dom';
import authService from 'authentication/authServices.js';
import store from 'redux/store/index'
import { openModal } from 'redux/services/modalServices';
const RequireLoginRoute = ({ path, component: Component, isAny, permissions, render, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (!authService.isLoggedIn())
        //yeu cau dang nhap
        {
          openModal("confirmation",
            {
              title: "Đăng nhập",
              text: "Hành động này cần đăng nhập!",
              confirmText: "Đăng nhập",
              onConfirm: () => { authService.doLogin() }
            })

          return (
            <Redirect
              to={{
                pathname: '/',
                state: { from: props.location },
              }}
            />
          );
        }
        if (permissions.length > 0 && !
          ((!isAny && authService.isGrantedAll(permissions))
            || (isAny && authService.isGrantedAny(permissions))
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
