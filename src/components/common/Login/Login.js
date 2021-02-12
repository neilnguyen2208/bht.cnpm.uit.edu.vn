import React from "react";
// import { Form, Button, Modal, Image, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./Login.scss";
import logo from 'assets/images/round_logo.png';
import { postLogin, getCurrentUser } from "redux/services/userServices";

import { bindActionCreators } from 'redux';
class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            modalShow: false,
            isLoginSuccess: false,

        };
        this.statusLoginCode = 0;
        this.modalMessage = "";
        this.modalOKMessage = "Đồng ý";
        this.username = React.createRef("");
        this.password = React.createRef("");
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.login = this.login.bind(this);
        this.register = this.register.bind(this);
    }

    handleUsernameChange(e) {
        e.preventDefault();
        this.setState({ username: this.username.current.value })
    }

    handlePasswordChange(e) {
        e.preventDefault();
        this.setState({ password: this.password.current.value })
    }



    login() {
        let token = "eyJpc3MiOiJ0b3B0YWwuY29tIiwiZXhwIjoxNDI2NDIwODAwLCJodHRwOi8vdG9wdGFsLmNvbS9qd3RfY2xhaW1zL2lzX2FkbWluIjp0cnVlLCJjb21wYW55IjoiVG9wdGFsIiwiYXdlc29tZSI6dHJ1ZX0";
        localStorage.setItem('token', token);

        const account = {
            username: this.state.username,
            password: this.state.password,
        }
        this.props.postLogin(account);

    }

    componentWillReceiveProps(nextProps) {
        this.statusLoginCode = nextProps.statusLoginCode;
        this.handleModal();
    }

    handleModal() {
        if (this.statusLoginCode === 3) {
            this.setState({
                isLoginSuccess: true,
                modalShow: true,
            });
            this.modalMessage = "Đăng nhập thành công";
        } else {
            this.setState({
                isLoginSuccess: false,
                modalShow: true,
            });
            switch (this.statusLoginCode) {
                case 0:
                    this.modalMessage = "Đăng nhập thất bại, sai tài khoản";
                    break;
                case 1:
                    this.modalMessage = "Đăng nhập thất bại, sai mật khẩu";
                    break;
                default:
                    break;

            }
        }
    }
    
    handleClose() {
        this.setState({
            modalShow: false,
        });
        if (this.statusLoginCode === 3) {
            
        }
    }

    register() {
       
    }

    forgotpassword() { }

    render() {
        return (
            <div>
           
            </div >
        );
    }
}

const mapStateToProps = (state) => {
    return {
        statusLoginCode: state.user.statusLoginCode,
    };
};
const mapDispatchToProps = (dispatch) => bindActionCreators({
    postLogin,
    getCurrentUser,
}, dispatch);


export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(LoginForm)
);
