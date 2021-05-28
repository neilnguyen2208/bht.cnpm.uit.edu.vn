import authService from 'authentication/authServices.js';
import { openModal } from 'redux/services/modalServices'
import React from "react";

//component wrapper by this component will show but will 
export class RequireLogin extends React.Component {

  handleClick = () => {
    console.log(this.props.permissions)
    authService.isGrantedAll(this.props.permissions)
    if (authService.isGrantedAll(this.props.permissions)) {
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

    return (
      <div onClick={this.handleClick}>
        {this.props.children}
      </div>
    );
  }
};


