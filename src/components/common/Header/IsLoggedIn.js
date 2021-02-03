import React, { Component } from "react";
import { Nav, Dropdown, OverlayTrigger, Popover, Badge } from "react-bootstrap";
import "./IsLoggedIn.scss";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from 'redux';
import avatar from 'assets/images/anh.jpg';
import { getLogout } from "redux/services/userServices"
import { redirect } from 'constants.js'
class LoginStatus extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: false,
        };
    }
   
    handleLogin() {
        redirect("/login");
    }
    handleLogout() {
        this.props.getLogout();
        redirect("/login");
    }
    render() {
        const {account} = this.props;
        if (account === null) {
            return (
                <Nav.Link
                    onClick={this.handleLogin.bind(this)}
                    className="menu-item"
                    href=""
                >
                    Đăng nhập
                </Nav.Link>
            );
        } else {
            return (
                <div id="login-status">
                    <OverlayTrigger
                        trigger="click"
                        key={"bottom"}
                        placement={"bottom"}
                        overlay={
                            <Popover id={`popover-positioned-${"bottom"}`}>
                                <Popover.Content>
                                    <Dropdown.Item>
                                        {'Xin chào, ' + account.username}
                                    </Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item href="/user">
                                        Trang cá nhân
                                    </Dropdown.Item>
                                    <Dropdown.Item href="/user">
                                        <p style={{ display: "inline" }}>
                                            Thông báo {' '}
                                        </p>
                                        <Badge variant="success">9</Badge>
                                    </Dropdown.Item>
                                    <Dropdown.Item href="/user">
                                        Bài viết của tôi
                                    </Dropdown.Item>
                                    <Dropdown.Item href="/user">
                                        Tài liệu của tôi
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        onClick={this.handleLogout.bind(this)}
                                    >
                                        Đăng xuất
                                    </Dropdown.Item>
                                </Popover.Content>
                            </Popover>
                        }
                    >
                        <img src={avatar} alt="Avatar" id="avatar" />
                    </OverlayTrigger>{" "}
                </div>
            );
        }
    }
}


const mapStateToProps = (state) => {
    return {
        
    };
};
const mapDispatchToProps = (dispatch) => bindActionCreators({
    getLogout,
}, dispatch);


export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(LoginStatus)
);
