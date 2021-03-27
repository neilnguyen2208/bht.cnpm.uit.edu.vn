import React from "react";
import 'components/styles/Button.scss'
import { closeBigModal, closeModal, openModal } from "redux/actions/modalAction";
import store from 'redux/store/index.js'
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import "components/common/CustomCKE/CKEditorContent.scss";
import 'components/styles/Detail.scss'
import { validation, styleFormSubmit } from 'utils/validationUtils'
import { Link } from 'react-router-dom'
import './Login.scss'
import round_logo from 'assets/images/round_logo.png'
import ReCAPTCHA from "react-google-recaptcha";

const validationCondition = {
  form: '#login-form',
  rules: [
    //truyen vao id, loai component, message
    validation.isRequired('login-form-username', 'text-input', 'Vui lòng nhập username!'),
    validation.noSpecialChar('login-form-username', 'text-input', 'Tên đăng nhập không được chứa ký tự đặc biệt!'),
    validation.isRequired('login-form-password', 'text-input', 'Vui lòng nhập password!'),


  ],
}

class Login extends React.Component {

  componentDidMount() {
    validation(validationCondition);
    this.setState({ isViewPass: false })
  }

  componentWillUnmount() {

  }


  handleUploadBtnClick = () => {
    if (styleFormSubmit(validationCondition)) {
      store.dispatch(openModal("confirmation",
        {
          title: "Thay đổi tài liệu",
          text: "Hành động này cần phê duyệt và không thể hoàn tác.",
          confirmText: "Xác nhận",
          cancelText: "Huỷ",
          onConfirm: () => {
            this.props.editADocument(this.props.id, {});
            store.dispatch(closeModal()); //close confimation popup
            this.closeModal(); //close edit document popup
          }
        }))
    }
  }


  closeModal = () => {
    store.dispatch(closeBigModal())
  }

  render() {
    return (
      <div className="login-form-container ">
        <div className="scroller-container d-flex" style={{ padding: "0px" }} >
          <div className="login-sidebar">
            {/* Chào mừng đến với */}
            <img alt="" />
          </div>

          <form className="login-form" id="login-form">
            <div className="mg-bottom-10px">
              <img alt="" src={round_logo} className="login-icon" />
              <div className="login-title">Welcome!</div>
            </div>
            <div className="form-container o-f-hidden">
              <div className="form-group">
                <label className="form-label-required"  >Tên đăng nhập:</label>
                <input type="text" className="text-input" id="login-form-username" placeholder="Nhập username ..." />
                <div className="form-error-label-container">
                  <span className="form-error-label" ></span>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label-required" >Mật khẩu:</label>
                <input type="text" className="text-input" id="login-form-password" type="password" placeholder="Nhập password ..." />
                <div className="form-error-label-container">
                  <span className="form-error-label" ></span>
                </div>
              </div>
              <div className="d-flex form-group">
                <input type="checkbox" className="form-check-box mg-top-5px" onClick={(e) => {
                  let passwordField = document.getElementById("login-form-password");
                  if (e.target.checked) {
                    passwordField.type = "text";
                  }
                  else {
                    passwordField.type = "password";
                  }
                }} />
                <div className="form-tip-label-2 mg-top-5px" > Hiện mật khẩu</div>
              </div>
              <div className="form-group">
                <div className="reCapcha-wrapper">
                  <ReCAPTCHA sitekey="6Lfz648aAAAAADzC-bW2K8CXpQ8ZEJETupqfHBe8"
                    onChange={this.onReCAPCHATokenChange} />
                </div>
              </div>
              <div className="form-line" />
              <div className="form-group mg-top-10px">
                <div className="j-c-space-between">
                  <Link to="/forgot-password" className="forgot-password">Quên mật khẩu?</Link>
                  <button className="blue-button">Đăng nhập</button>
                </div>

              </div>
              <div className="mg-top-10px d-flex">
                <div style={{ marginTop: "3px", marginRight: "4px" }}> Nếu chưa có tài khoàn, vui lòng</div> <Link to="/register" className="link-label-m">đăng ký</Link>
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

  };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({

}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
