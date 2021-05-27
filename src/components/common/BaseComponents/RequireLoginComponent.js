// import { isGrantedAll } from 'keycloakServices.js';
import { openModal } from 'redux/services/modalServices'
import React from "react";
// import keycloak from "keycloak.js"

export class RequireLogin extends React.Component {

  handleClick = () => {
    // if (isGrantedAll(this.props.permissions)) {
    // this.props.expectedEvent();
    // }
    // else {
    openModal("confirmation",
      {
        title: "Đăng nhập",
        text: "Hành động này cần đăng nhập!",
        confirmText: "Đăng nhập",
        // onConfirm: () => { keycloak.login() }
      });
    // }
  }
  render() {

    return (
      <div onClick={this.handleClick}>
        {this.props.children}
      </div>
    );
  }
};


