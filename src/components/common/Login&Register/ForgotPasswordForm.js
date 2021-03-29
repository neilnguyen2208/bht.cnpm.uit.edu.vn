import React from "react";
import 'components/styles/Button.scss'
import { closeBigModal, closeModal, openModal } from "redux/services/modalServices";
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
  form: '#register-form',
  rules: [
    //truyen vao id, loai component, message
    validation.isRequired('register-form-username', 'text-input', 'Tên đăng nhập không được để trống!'),
    validation.noSpecialChar('register-form-username', 'text-input', 'Tên đăng nhập không được chứa ký tự đặc biệt!'),
    validation.minLength('register-form-username', 'text-input', 'Tên đăng nhập không được chứa ký tự đặc biệt!'),


  ],
}

class ForgotPasswordForm extends React.Component {

  componentDidMount() {
    validation(validationCondition);
    this.renderStep(1);

  }

  componentWillUnmount() {

  }

  renderStep = (step) => {
    if (step === 1) {
      document.querySelector(`.forgot-pass-deco-bar-2`).classList.remove("active");
      document.querySelector(`#forgot-pass-step-3-ind`).classList.remove("active");
      document.querySelector("#forgot-pass-step-2-ind").classList.remove("active");
      document.querySelector(`.forgot-pass-deco-bar-1`).classList.remove("active");
      document.querySelector("#forgot-pass-step-1-ind").classList.add("active");
      document.querySelector("#forgot-pass-step-1").style.display = "block";
      document.querySelector("#forgot-pass-step-2").style.display = "none";
      document.querySelector("#forgot-pass-step-3").style.display = "none";

      this.setState({});
      return;
    }
    if (step === 2) {
      document.querySelector(`.forgot-pass-deco-bar-2`).classList.remove("active");
      document.querySelector(`#forgot-pass-step-3-ind`).classList.remove("active");
      document.querySelector("#forgot-pass-step-2-ind").classList.add("active");
      document.querySelector(`.forgot-pass-deco-bar-1`).classList.add("active");
      document.querySelector("#forgot-pass-step-1-ind").classList.add("active");
      document.querySelector("#forgot-pass-step-1").style.display = "none";
      document.querySelector("#forgot-pass-step-2").style.display = "block";
      document.querySelector("#forgot-pass-step-3").style.display = "none";
      this.setState({});
      return;
    }
    document.querySelector(`.forgot-pass-deco-bar-2`).classList.add("active");
    document.querySelector(`#forgot-pass-step-3-ind`).classList.add("active");
    document.querySelector("#forgot-pass-step-2-ind").classList.add("active");
    document.querySelector(`.forgot-pass-deco-bar-1`).classList.add("active");
    document.querySelector("#forgot-pass-step-1-ind").classList.add("active");
    document.querySelector("#forgot-pass-step-1").style.display = "none";
    document.querySelector("#forgot-pass-step-2").style.display = "none";
    document.querySelector("#forgot-pass-step-3").style.display = "block";
  }

  handleUploadBtnClick = () => {
    if (styleFormSubmit(validationCondition)) {
      openModal("confirmation",
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
        })
    }
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

        <div className="register-form-c">
          <form className="register-form mg-auto" id="forgot-pass-form">
            <div className="reg-step-bar">
              <div className="forgot-pass-deco-bar-1" />
              <div className="forgot-pass-deco-bar-2" />
              <div className="reg-step-ind" id="forgot-pass-step-1-ind" >1</div>
              <div className="reg-step-ind" id="forgot-pass-step-2-ind" >2</div>
              <div className="reg-step-ind" id="forgot-pass-step-3-ind" >3</div>

            </div>
            <div className="form-line mg-bottom-10px" />
            {/* Step 1 */}
            <div className="form-container o-f-hidden" id="forgot-pass-step-1">
              <div className="form-group">
                <label className="form-label-required">Email:</label>
                <input type="text" className="text-input" id="register-form-username" placeholder="Nhập email ..." />
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
            <div className="form-container o-f-hidden" id="forgot-pass-step-2">
              <div className="form-group">
                <label className="form-label-required">Nhập mã xác nhận:</label>
                <input type="text" className="text-input" id="register-form-username" placeholder="Nhập mã xác nhận ..." />
                <div className="form-error-label-container">
                  <span className="form-error-label" ></span>
                </div>
              </div>

              <div className="form-line" />
              <div className="form-group mg-top-10px">
                <div >Mã xác nhận được tới gmail của bạn chỉ có hiệu lực trong vòng <b>10 phút</b>.</div>
                <div className="j-c-space-between mg-top-10px">
                  <div className="link-label-s" style={{ color: "var(--light-black)" }} onClick={(e) => {
                    e.preventDefault();
                    this.renderStep(1);
                  }}>{"<< Quay lại"}</div>
                  <button className="blue-button" onClick={(e) => {
                    e.preventDefault();
                    this.renderStep(3);
                  }}>Tiếp theo</button>
                </div>
              </div>
            </div >

            <div className="form-container o-f-hidden" id="forgot-pass-step-3">
              <div className="form-group">
                <label className="form-label-required">Nhập mật khẩu mới:</label>
                <input type="text" className="text-input" id="register-form-username" placeholder="Nhập mật khẩu mới ..." />
                <div className="form-error-label-container">
                  <span className="form-error-label" ></span>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label-required">Xác nhận mật khẩu:</label>
                <input type="text" className="text-input" id="register-form-username" placeholder="Nhập lại mật khẩu ..." />
                <div className="form-error-label-container">
                  <span className="form-error-label" ></span>
                </div>
              </div>
              <div className="form-line" />
              <div className="form-group mg-top-10px">

                <div className="j-c-space-between mg-top-10px">
                  <div className="link-label-s" style={{ color: "var(--light-black)" }} onClick={(e) => {
                    e.preventDefault();
                    this.renderStep(2);
                  }}>{"<< Quay lại"}</div>
                  <button className="blue-button" onClick={(e) => {
                    //Đăng ký
                  }}>Xác nhận</button>
                </div>
              </div>
            </div >

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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordForm));
