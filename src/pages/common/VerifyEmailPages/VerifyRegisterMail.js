import React, { Component } from "react";
import round_logo from 'assets/images/round_logo.png';
import { getQueryParamByName } from 'utils/urlUtils';
import success_icon from 'assets/icons/svg/success_icon.svg';
import { request, appBaseUrl } from 'utils/requestUtils';

class VerifyRegisterMail extends Component {

    componentDidMount() {

        this.token = getQueryParamByName('token');
        this.email = getQueryParamByName('email');
        this.confirmRegisterEmail(this.email, this.token);
        this.timeOut = null;
    }
    state = {
        message: <></>
    }
    confirmRegisterEmail = (email, token) => {
        request.get(`/user/verify?email=${email}&token${token}`).then(
            response => {
                this.setState({
                    message: <div className="mg-bottom-10px">
                        <img alt="" src={round_logo} className="login-icon" />
                        <div className="login-title" >Success!</div>
                        <div className="d-flex">
                            <div className="d-flex" style={{ margin: "auto", marginTop: "1rem", borderTop: "1px solid #c4c4c4" }}  >
                                <img style={{ width: "1.3rem", marginTop: "0.5rem", height: "1.3rem" }} src={success_icon} alt="" />
                                <div style={{ marginTop: "0.6rem", marginLeft: "0.2rem" }} >Xác nhận email thành công</div>
                            </div>
                        </div>
                        <div style={{ marginTop: "0.6rem", marginLeft: "0.2rem" }} ></div>
                    </div>
                });
                this.timeOut = setTimeout(() => { window.location.href = appBaseUrl }, 3000);
            }
        ).catch(error => {
            this.timeOut = setTimeout(() => { window.location.href = appBaseUrl }, 1000);
        }
        )
    }

    componentWillUnmount() {
        if (this.timeOut !== null) clearTimeout(this.timeOut);
    }
    render() {
        return (
            <div style={{ borderBottom: "40px solid white" }} >
                { this.state.message}
            </div >
        );
    }
}

export default VerifyRegisterMail;
