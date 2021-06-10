import authService from 'authentication/authServices.js';
import { openModal } from 'redux/services/modalServices'
import React from "react";

//component wrapper by this component will show a LoginModal if user not logged in or not granted permissions
//Set blur = true=> wrapped component will be blur and disabled if current component is not allowed by an action 
//Set isAny = true => user only need to grant one of array of permissions

export class RequireLogin extends React.Component {
  handleClick = () => {
    if (
      (this.props.isAny && authService.isGrantedAny(this.props.permissions))
      || (authService.isGrantedAll(this.props.permissions))
    ) {
      if (this.props.expectedEvent)
        this.props.expectedEvent();
    }
    else {
      openModal("confirmation",
        {
          title: "Đăng nhập",
          text: "Hành động này cần đăng nhập!",
          confirmText: "Đăng nhập",
          onConfirm: () => { authService.doLogin() }
        });
    }
  }

  render() {
    //if logged in and props.availableAction => handle by action
    if (authService.isLoggedIn() && this.props.availableActions && this.props.requiredAction) {
      //if has required action
      if (this.props.availableActions.includes(this.props.requiredAction)) {
        return (
          <div onClick={this.handleClick}>
            {this.props.children}
          </div>
        );
      }
      //else 
      //if hideOnAction
      if (this.props.showOnAction)
        return (
          <div>
          </div>
        );
      return (
        <div style={{ opacity: "50%" }} className="banned-action">
          {this.props.children}
        </div>
      );
    }

    //else handle by permission 
    return (
      <div onClick={this.handleClick}>
        {this.props.children}
      </div>
    );
  }
};


