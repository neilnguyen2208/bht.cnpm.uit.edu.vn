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
const validationCondition = {
  form: '#forgot-pass-form',
  rules: [
    //truyen vao id, loai component, message
    validation.isRequired('forgot-pass-form-username', 'text-input', 'Tên đăng nhập không được để trống!'),
    validation.noSpecialChar('forgot-pass-form-username', 'text-input', 'Tên đăng nhập không được chứa ký tự đặc biệt!'),
    validation.minLength('forgot-pass-form-username', 'text-input', 'Tên đăng nhập không được chứa ký tự đặc biệt!'),


  ],
}

class Login extends React.Component {

  componentDidMount() {
    validation(validationCondition);
    this.renderStep(1);

  }

  componentWillUnmount() {

  }

  renderStep = (step) => {
    if (step === 1) {
      document.querySelector("#reg-step-2-ind").classList.remove("active");
      document.querySelector(`.reg-deco-bar-1`).classList.remove("active");
      document.querySelector("#reg-step-1-ind").classList.add("active");
      document.querySelector("#reg-step-1").style.display = "block";
      document.querySelector("#reg-step-2").style.display = "none";

      this.setState({});
      return;
    }

    document.querySelector("#reg-step-2-ind").classList.add("active");
    document.querySelector(`.reg-deco-bar-1`).classList.add("active");
    document.querySelector("#reg-step-1-ind").classList.add("active");
    document.querySelector("#reg-step-1").style.display = "none";
    document.querySelector("#reg-step-2").style.display = "block";
    this.setState({});
    return;
  }

  closeModal = () => {
    store.dispatch(closeBigModal())
  }

  render() {
    return (
      <div >
        <div className="mg-bottom-10px">
          <img alt="" src={round_logo} className="login-icon" />
          <div className="login-title">Welcome!</div>
          <div className="w-100-percents t-a-center mg-top-10px">Lấy lại mật khẩu của bạn</div>
        </div>

        <div className="forgot-pass-form-c">
          <form className="forgot-pass-form  mg-auto" id="forgot-pass-form">
            <div className="reg-step-bar">
              <div className="reg-deco-bar-1" />
              <div className="reg-step-ind" id="reg-step-1-ind" >1</div>
              <div className="reg-step-ind" id="reg-step-2-ind" >2</div>
            </div>
            <div className="form-line mg-bottom-10px" />
            {/* Step 1 */}
            <div className="form-container o-f-hidden" id="reg-step-1">
              <div className="form-group">
                <label className="form-label-required">Tên đăng nhập:</label>
                <input type="text" className="text-input" id="forgot-pass-form-username" placeholder="Nhập username ..." />
                <div className="form-error-label-container">
                  <span className="form-error-label" ></span>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label-required" >Mật khẩu:</label>
                <input type="text" className="text-input" id="forgot-pass-form-password" type="password" placeholder="Nhập password ..." />
                <div className="form-error-label-container">
                  <span className="form-error-label" ></span>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label-required" >Xác nhận mật khẩu:</label>
                <input type="text" className="text-input" id="forgot-pass-form-confirm-password" type="password" placeholder="Nhập password ..." />
                <div className="form-error-label-container">
                  <span className="form-error-label" ></span>
                </div>
              </div>
              <div className="form-line" />
              <div className="form-group mg-top-10px">
                <div className="j-c-end">
                  <button className="blue-button" onClick={(e) => {
                    e.preventDefault();
                    this.renderStep(2);
                  }}>Tiếp theo</button>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="form-container o-f-hidden" id="reg-step-2">
              <div className="form-group">
                <label className="form-label-required">Xác nhận email:</label>
                <input type="text" className="text-input" id="forgot-pass-form-username" placeholder="Nhập mã xác nhận ..." />
                <div className="form-error-label-container">
                  <span className="form-error-label" ></span>
                </div>
              </div>
              <div className="form-line" />
              <div className="form-group mg-top-10px">
                <div className="d-flex" >
                  <input type="checkbox" className="form-check-box " />
                  <div style={{ marginTop: "3px", marginLeft: "4px", marginRight: "4px" }}> Đồng ý với </div> <Link to="/login" className="link-label-m">Điều khoản và dịch vụ</Link>
                </div>
                <div className="j-c-space-between mg-top-10px">
                  <div className="link-label-s" style={{ color: "var(--light-black)" }} onClick={(e) => {
                    e.preventDefault();
                    this.renderStep(2);
                  }}>{"<< Quay lại"}</div>
                  <button className="blue-button" onClick={(e) => {
                    //Đăng ký
                  }}>Đăng ký</button>
                </div>
              </div>
            </div >

            <div className="mg-top-10px d-flex">
              <div style={{ marginTop: "3px", marginRight: "4px" }}> Nếu đã có tài khoản, bạn có thể</div> <Link to="/login" className="link-label-m">đăng nhập</Link>
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
