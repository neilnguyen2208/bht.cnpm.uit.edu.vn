import React, { Component } from "react";
import LoginModal from "components/common/Modal/CustomModal/LoginModal";
class Login extends Component {
    render() {
        return (
            <div>
                <LoginModal hideClose/>
            </div>
        );
    }
}

export default Login;
