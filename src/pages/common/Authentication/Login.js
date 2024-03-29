import React from 'react';
import { login } from 'redux/services/authServices';
import { bindActionCreators } from 'redux';
import { Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Loader from 'components/common/Loader/Loader_S';
import { openBLModal } from 'redux/services/modalServices';

class Login extends React.Component {

    componentDidMount() {
    }

    render() {
        // if (this.props.isAuthenticating) {
        return <Loader text="Đang chuyển hướng ..." />;
        // }
        // if (this.props.isAuthenticated) {

        // sso 
        // openBLModal({ type: "success", text: "Đăng nhập thành công!" })
        // return <Redirect to="/" />;
        // }
        // return <Loader text="Đang chuyển hướng ..." />;
    }
}

const mapStateToProps = (state) => {
    return {
    };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    // login
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
