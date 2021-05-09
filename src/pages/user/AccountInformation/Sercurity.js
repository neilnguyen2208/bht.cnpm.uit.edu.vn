import React from 'react'
import Titlebar from 'components/common/Titlebar/Titlebar'
//import for Redux
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import UserSidebar from "layouts/UserSidebar"
import { Link } from '@material-ui/core';

class Security extends React.Component {
    constructor(props) {
        super();
    }

    componentDidMount() {
    }

    render() {

        return (
            <div className="left-sidebar-layout">
                <UserSidebar />
                <div className="content-layout">
                    <Titlebar />
                    <div className="content-container">
                        <div className="setting-title">Cài đặt mật khẩu</div>

                        <form className="login-form" id="login-form">
                            <div className="form-container">

                                <div className="form-group">
                                    <label className="form-label-required" >Mật khẩu:</label>
                                    <input className="text-input" id="login-form-password" type="password" placeholder="Nhập password " />
                                    <div className="form-error-label-container">
                                        <span className="form-error-label" ></span>
                                    </div>
                                </div>
                                <div className="d-flex form-group pd-top-5px">
                                    <label className="form-checkbox-container" >
                                        <input type="checkbox" className="form-checkbox" onClick={(e) => {
                                            let passwordField = document.getElementById("login-form-password");
                                            if (e.target.checked) {
                                                passwordField.type = "text";
                                            }
                                            else {
                                                passwordField.type = "password";
                                            }
                                        }} />
                                        <span className="form-checkbox-style"></span>
                                        <div className="form-tip-label-2" > Hiện mật khẩu</div>
                                    </label>
                                </div>

                                <div className="form-group">
                                    <label className="form-label-required"  >Mật khẩu mới</label>
                                    <input type="text" className="text-input" id="login-form-username" placeholder="Nhập username hoặc email " />
                                    <div className="form-error-label-container">
                                        <span className="form-error-label" ></span>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="form-label-required"  >Xác nhận mật khẩu</label>
                                    <input type="text" className="text-input" id="login-form-username" placeholder="Nhập username hoặc email " />
                                    <div className="form-error-label-container">
                                        <span className="form-error-label" ></span>
                                    </div>
                                </div>

                                <div className="j-c-space-between">
                                    <Link to="/forgot-password" className="forgot-password">Quên mật khẩu?</Link>
                                    <button className="blue-button" onClick={(e) => { this.onLoginClick(e) }}>Lưu thay đổi</button>
                                </div>
                               
                            </div>

                        </form>
                    </div >
                </div >
            </div >
        );
    }

    //#endregion

    //#region main handler to call APIs
    handlerUpdatePassword = (e) => {
        e.preventDefault();

    }

}

//#region for Redux
const mapStateToProps = (state) => {
    return {
    };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Security));
 //#endregion