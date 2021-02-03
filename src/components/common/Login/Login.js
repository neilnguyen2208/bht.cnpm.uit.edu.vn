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
                {/*                  <Modal centered show={this.state.modalShow} onHide={this.handleClose} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title contained-modal-title-vcenter="true">
                            Thông báo
                        </Modal.Title>
                    </Modal.Header>
                    {(() => {
                        if (this.state.isLoginSuccess) {
                            return (
                                <div>
                                    <Modal.Body>
                                        {this.modalMessage} &#128540;
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="success" onClick={this.handleClose}
                                        >
                                            {this.modalOKMessage}
                                        </Button>
                                    </Modal.Footer>
                                </div>
                            );
                        } else {
                            return (
                                <div>
                                    <Modal.Body>
                                        {this.modalMessage} &#128517;
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="danger" onClick={this.handleClose}>
                                            {this.modalOKMessage}
                                        </Button>
                                    </Modal.Footer>
                                </div>
                            );
                        }
                    })()}
                </Modal>

                <div className="d-flex justify-content-center">
                    <Form id="login-form">
                        <Image className="rounded mx-auto d-block" height="200px" width="200px" alt="logo" src={logo} center></Image>
                        <p className="title text-center">ĐĂNG NHẬP</p>
                        <br />
                        <Form.Group className="email-input" controlId="formBasicEmail">
                            <Form.Control onChange={this.handleUsernameChange} type="text" placeholder="Nhập username" ref={this.username} />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Control onChange={this.handlePasswordChange} type="password" placeholder="Nhập mật khẩu" ref={this.password} />
                        </Form.Group>
                        <Form.Group controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Ghi nhớ đăng nhập" />
                        </Form.Group>
                        <Button className="btn-block" onClick={this.login}>
                            Đăng nhập
                        </Button>
                        <Link to="/">
                            <p className="text-center pt-3">
                                Hoặc xem với tư cách khách &#128526;
                            </p>
                        </Link>

                        <Row className="pt-3">
                            <Col className="btn-register">
                                <Button onClick={this.register} className="btn-block" >
                                    Đăng ký
                                </Button>
                            </Col>

                            <Col className="btn-forgot">
                                <Button className="btn-block" href="/forgotpass">
                                    Quên mật khẩu
                                </Button>
                            </Col>
                        </Row>
                    </Form>

            </div>
                    */}
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
