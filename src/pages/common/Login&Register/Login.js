import React from 'react';
import LoginModal from "components/common/Modal/CustomModal/LoginModal";
class Login extends React.Component {
    render() {
        return (
            <div>
                <LoginModal hideClose/>
            </div>
        );
    }
}

export default Login;
