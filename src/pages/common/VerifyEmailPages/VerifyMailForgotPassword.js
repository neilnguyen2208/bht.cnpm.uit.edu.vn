import React from 'react';
import round_logo from 'assets/images/round_logo.png';
import { getQueryParamByName } from 'utils/urlUtils';
// import { validation, styleFormSubmit } from 'utils/validationUtils'

// const validationCondition = {
//     form: '#verify-forgot-pass-form',
//     rules: [
//         //truyen vao id, loai component, message
//         validation.isRequired('forgot-pass-email', 'text-input', 'Email không được để trống!'),
//         validation.isEmail('forgot-pass-email', 'text-input', 'Email không đúng định dạng!'),
//         validation.isRequired('forgot-pass-ReCAPTCHA', 'ReCAP')
//     ],
// }
class VerifyMailForgotPassword extends React.Component {

    componentDidMount() {

        this.token = getQueryParamByName('token');
        this.email = getQueryParamByName('email');
        this.timeOut = null;
    }

    state = {
        message: <></>
    }

    componentWillUnmount() {
    }

    onVerifyChangePass = () => {

    }

    render() {
        //fpve: forgot pass verify email
        //fpnp: forgot pass new pass
        //fpcp: forgot pass confirm pass

        return (
            <div style={{ borderBottom: "40px solid white" }} >
                <div className="mg-bottom-10px">
                    <img alt="" src={round_logo} className="login-icon" />
                    <div className="gray-form-title">Welcome!</div>
                    <div className="w-100-percents t-a-center mg-top-10px">Lấy lại mật khẩu của bạn</div>
                </div>
                <form className="register-form mg-auto" id="verify-forgot-pass-form">
                    <div className="form-container o-f-hidden" id="fpve">
                        <div className="form-group">
                            <label className="form-label-required">Nhập mật khẩu mới:</label>
                            <input type="text" className="text-input" id="fpnp" placeholder="Nhập mật khẩu mới " />
                            <div className="form-error-label-container">
                                <span className="form-error-label" ></span>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="form-label-required">Xác nhận mật khẩu:</label>
                            <input type="text" className="text-input" id="fpcp" placeholder="Nhập lại mật khẩu " />
                            <div className="form-error-label-container">
                                <span className="form-error-label" ></span>
                            </div>
                        </div>
                        <div className="form-line" />
                        <div className="form-group mg-top-10px">
                            <div className="j-c-end mg-top-10px">
                                <button className="blue-button" onClick={(e) => {
                                    this.onVerifyChangePass()
                                }}>Xác nhận</button>
                            </div>
                        </div>
                    </div >
                </form>
            </div >
        );
    }
}

export default VerifyMailForgotPassword;
