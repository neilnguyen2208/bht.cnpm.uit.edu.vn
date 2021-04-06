import { isGrantedAll } from 'utils/authUtils';
import { openBigModal, openBLModal } from 'redux/services/modalServices'
import React from "react";

export class RequireLogin extends React.Component {

  handleClick = () => {
    if (isGrantedAll(this.props.permissions)) {
      this.props.expectedEvent();
    }
    else {
      openBigModal("login-modal", {});
      openBLModal({ type: "warning", text: "Hành động này cần đăng nhập nhậpnhậpnhập!" });

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


