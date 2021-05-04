import React from "react";
import 'components/styles/Button.scss'
import { closeBigModal } from "redux/services/modalServices";
import { Link, Redirect, withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import "components/common/CustomCKE/CKEditorContent.scss";
import 'components/styles/Detail.scss'
import { validation, styleFormSubmit } from 'utils/validationUtils'
import './Login.scss'
import round_logo from 'assets/images/round_logo.png'
import fb_icon from 'assets/icons/24x24/b_facebook_icon_24x24.png';
import CustomReCAPTCHA from 'components/common/CustomReCAPTCHA/CustomReCAPTCHA';
import { login } from 'redux/services/authServices'
import { openBLModal } from 'redux/services/modalServices'

const validationCondition = {
  form: '#login-form',
  rules: [
    //truyen vao id, loai component, message
    validation.isRequired('login-form-username', 'text-input', 'Vui lòng nhập username!'),
    validation.noSpecialChar('login-form-username', 'text-input', 'Tên đăng nhập không được chứa ký tự đặc biệt!'),
    validation.isRequired('login-form-password', 'text-input', 'Vui lòng nhập password!'),
    validation.minLength('login-form-password', 'text-input', 6, 'Nhập tối thiểu 6 ký tự!'),
    validation.isRequired('login-form-ReCAP', 'ReCAP')

  ],
}

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.LOGIN_DTO = {
      username: '',
      password: '',
      captcha: ''
    }
  }

  componentDidMount() {
    validation(validationCondition);
  }

  componentWillUnmount() {

  }

  onLoginClick = (e) => {
    e.preventDefault();

    this.LOGIN_DTO = {
      ...this.LOGIN_DTO,
      username: document.getElementById('login-form-username').value,
      password: document.getElementById('login-form-password').value,
    }


    if (styleFormSubmit(validationCondition)) {

      this.props.login(this.LOGIN_DTO);
      console.log(this.LOGIN_DTO);
    }
  }

  onReCAPCHATokenChange = (value) => {
    console.log(value);
    this.LOGIN_DTO = { ...this.LOGIN_DTO, captcha: value }
  }

  render() {

    if (this.props.isAuthenticated) {
      openBLModal({ type: "success", text: "Đăng nhập thành công!" });
      closeBigModal();
    }

    return (
      <div className="login-form-container">

        {this.props.isAuthenticated ? <Redirect to="/" /> : <></>}

        <div className="scroller-container d-flex" style={{ padding: "0px" }} >
          <div className="login-sidebar">
            <div>
              Chào mừng đến với
            <br />
              <div className="sidebar-bht-name"> BHT
              Đoàn khoa Công nghệ phần mềm.
               </div>
            </div>
            <img alt="" className="mg-top-5px" src={fb_icon} />
            <br />
            <div style={{ borderBottom: "1px white solid", paddingBottom: "0.1rem", marginTop: "0.625rem", marginBottom: "10px" }}> Đăng nhập để trải nghiệm: </div>
            <div style={{ lineHeight: "1.2rem" }}>
              - Tương tác với các bài viết và tài liệu. <br />
          - Chia sẻ các tài liệu và bài viết. <br />
          - Chia sẻ và tận dụng nguồn bài tập. <br />
          - Tải tài liệu. <br />
            </div>
          </div>

          <form className="login-form" id="login-form">
            <div className="mg-bottom-10px">
              <img alt="" src={round_logo} className="login-icon" />
              <div className="gray-form-title">Welcome!</div>
            </div>
            <div className="form-container">
              <div className="form-group">
                <label className="form-label-required"  >Tên đăng nhập/Email:</label>
                <input type="text" className="text-input" id="login-form-username" placeholder="Nhập username hoặc email " />
                <div className="form-error-label-container">
                  <span className="form-error-label" ></span>
                </div>
              </div>
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
                <CustomReCAPTCHA id="login-form-ReCAP"
                  onTokenChange={(value) => this.onReCAPCHATokenChange(value)} />
                <div className="form-error-label-container">
                  <span className="form-error-label" ></span>
                </div>
              </div>

              <div className="form-line pd-top-10px" />
              <div className="form-group mg-top-10px">
                <div className="j-c-space-between">
                  <Link to="/forgot-password" className="forgot-password">Quên mật khẩu?</Link>
                  <button className="blue-button" onClick={(e) => this.onLoginClick(e)}> Đăng nhập</button>
                </div>

              </div>
              <div className="mg-top-10px d-flex">
                <div style={{ marginTop: "3px", marginRight: "4px" }}>
                  Nếu chưa có tài khoàn, vui lòng</div>
                <Link to="/register" className="link-label-m" onClick={() => closeBigModal()}>
                  đăng ký
                  </Link>
              </div>
            </div>

          </form>
        </div >
      </div >

    );
  }

}

const mapStateToProps = (state) => {
  return {
    isLogingIn: state.auth.isLogingIn,
    isAuthenticated: state.auth.isAuthenticated,


  };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  login
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
