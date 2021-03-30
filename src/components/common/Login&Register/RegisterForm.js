/* eslint-disable react/jsx-pascal-case */
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
import HoverHint from "../HoverHint/HoverHint";
import CustomReCAPTCHA from 'components/common/CustomReCAPTCHA/CustomReCAPTCHA';
import { register } from 'redux/services/authServices'
import Loader_S from 'components/common/Loader/Loader_S'
import { registerRequest } from 'redux/actions/authAction'

const validationCondition_1 = {
  form: '#register-form-step-1',
  rules: [
    //truyen vao id, loai component, message
    //username
    validation.isRequired('register-form-username', 'text-input', 'Tên đăng nhập không được để trống!'),
    validation.noSpecialChar('register-form-username', 'text-input', 'Tên đăng nhập không được chứa ký tự đặc biệt!'),
    validation.minLength('register-form-username', 'text-input', 6, 'Nhập tối thiểu 6 ký tự.'),

    //password
    validation.isRequired('register-form-password', 'text-input', 'Mật khẩu không được để trống!'),
    validation.minLength('register-form-password', 'text-input', 6, 'Nhập tối thiểu 6 ký tự.'),

    //confirmation password
    validation.isRequired('register-form-confirm-password', 'text-input', 'Mật khẩu xác nhận không được để trống!'),
    validation.isSameContent('register-form-confirm-password', 'text-input', 'register-form-password', 'Mật khẩu xác nhận không khớp!'),
  ],
}

const validationCondition_2 = {
  form: '#register-form-step-2',
  rules: [
    //truyen vao id, loai component, message
    //email
    validation.isRequired('register-form-email', 'text-input', 'Email không được để trống!'),
    validation.isEmail('register-form-email', 'text-input', 'Vui lòng nhập đúng email!'),

    //email
    validation.isRequired('register-form-confirm-email', 'text-input', 'Vui lòng xác nhận email!'),
    validation.isSameContent('register-form-confirm-email', 'text-input', 'register-form-email', 'Email xác nhận không đúng!'),

    //ten hien thi
    validation.isRequired('register-form-displayname', 'text-input', 'Tên hiển thị không được để trống!'),
    validation.minLength('register-form-displayname', 'text-input', 8, 'Nhập tối thiểu 8 ký tự.'),

    //checkbox
    validation.isRequired('register-form-confirm-tos', 'checkbox', 'Vui lòng xác nhận!'),


    //reCAPTCHA
    validation.isRequired('register-ReCAPTCHA', 'ReCAP')
  ],
}


const validationCondition_3 = {
  form: '#register-form-step-3',
  rules: [
    //truyen vao id, loai component, message
    //email
    validation.isRequired('register-form-confirm-code', 'text-input', 'Vui lòng nhập đủ 6 ký tự'),
    validation.minLength('register-form-confirm-code', 'text-input', 6, 'Vui lòng nhập đủ 6 ký tự!'),
  ],
}


class Register extends React.Component {

  constructor(props) {
    super(props);
    this.REGISTER_DTO = {
      "name": "",
      "displayName": "",
      "email": "",
      "password": "",
      "avatarURL": "https://i.imgur.com/SZJgL6C.png"
    }
  }

  componentDidMount() {
    validation(validationCondition_1);
    validation(validationCondition_2);
    validation(validationCondition_3);


    this.renderStep(1);

  }

  componentWillUnmount() {
    store.dispatch(registerRequest());
  }

  renderStep = (step) => {
    if (step === 1) {
      document.querySelector(`.reg-deco-bar-2`).classList.remove("active");
      document.querySelector(`#reg-step-3-ind`).classList.remove("active");
      document.querySelector("#reg-step-2-ind").classList.remove("active");
      document.querySelector(`.reg-deco-bar-1`).classList.remove("active");
      document.querySelector("#reg-step-1-ind").classList.add("active");
      document.querySelector("#reg-step-1").style.display = "block";
      document.querySelector("#reg-step-2").style.display = "none";
      document.querySelector("#reg-step-3").style.display = "none";

      this.setState({});
      return;
    }
    if (step === 2) {
      document.querySelector(`.reg-deco-bar-2`).classList.remove("active");
      document.querySelector(`#reg-step-3-ind`).classList.remove("active");
      document.querySelector("#reg-step-2-ind").classList.add("active");
      document.querySelector(`.reg-deco-bar-1`).classList.add("active");
      document.querySelector("#reg-step-1-ind").classList.add("active");
      document.querySelector("#reg-step-1").style.display = "none";
      document.querySelector("#reg-step-2").style.display = "block";
      document.querySelector("#reg-step-3").style.display = "none";
      this.setState({});
      return;
    }
    document.querySelector(`.reg-deco-bar-2`).classList.add("active");
    document.querySelector(`#reg-step-3-ind`).classList.add("active");
    document.querySelector("#reg-step-2-ind").classList.add("active");
    document.querySelector(`.reg-deco-bar-1`).classList.add("active");
    document.querySelector("#reg-step-1-ind").classList.add("active");
    document.querySelector("#reg-step-1").style.display = "none";
    document.querySelector("#reg-step-2").style.display = "none";
    document.querySelector("#reg-step-3").style.display = "block";
  }

  handleUploadBtnClick = () => {
    if (styleFormSubmit(validationCondition_1)) {
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

  handleFirstStep = () => {
    if (styleFormSubmit(validationCondition_1)) { // thuc hien kiem tra va tra ve ket qua true hay false.

      //gán data cho hai field là password và username.
      this.REGISTER_DTO = {
        ...this.REGISTER_DTO,
        "name": document.getElementById('register-form-username').value,
        "password": document.getElementById('register-form-password').value
      }

      //check if username existed
      this.renderStep(2);
    }

  }

  handleSecondStep = () => {
    if (styleFormSubmit(validationCondition_2)) { // thuc hien kiem tra va tra ve ket qua true hay false.

      this.REGISTER_DTO = {
        ...this.REGISTER_DTO,
        "email": document.getElementById('register-form-email').value,
        "displayName": document.getElementById('register-form-displayname').value
      }
      this.props.register(this.REGISTER_DTO);
      openModal("loader", { text: "Đang tạo thông tin tài khoản" });

      //check if username existed
    }
  }

  handleThirdStep = () => {
    if (styleFormSubmit(validationCondition_3)) {

    }
  }

  onReCAPCHATokenChange = (value) => {
    if (value) {

    }
    //value chính là key
  }

  render() {
    console.log(this.props.isSignedUp)
    if (this.props.isSignedUp) {
      closeModal();
      this.renderStep(3);
      store.dispatch(registerRequest());
    }

    return (
      <div style={{ borderBottom: "40px solid white" }}>
        <div className="mg-bottom-10px">
          <img alt="" src={round_logo} className="login-icon" />
          <div className="login-title">Welcome!</div>
          <div className="w-100-percents t-a-center mg-top-10px">Đăng ký tài khoản của bạn</div>
        </div>

        <div className="register-form-c">
          <div className="register-form mg-auto">
            <div className="reg-step-bar">
              <div className="reg-deco-bar-1" />
              <div className="reg-deco-bar-2" />
              <div className="reg-step-ind" id="reg-step-1-ind" >1</div>
              <div className="reg-step-ind" id="reg-step-2-ind" >2</div>
              <div className="reg-step-ind" id="reg-step-3-ind" >3</div>
            </div>
            <div className="form-line mg-bottom-10px" />
            
            {/* Step 1 */}
            <form id="register-form-step-1" >
              <div className="form-container " id="reg-step-1">
                <div className="form-group">
                  <label className="form-label-required">Tên đăng nhập:</label>
                  <input type="text" className="text-input" id="register-form-username" placeholder="Nhập username ..." />
                  <div className="form-error-label-container">
                    <span className="form-error-label" ></span>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label-required" >Mật khẩu:</label>
                  <input className="text-input" id="register-form-password" type="password" placeholder="Nhập mật khẩu ..." />
                  <div className="form-error-label-container">
                    <span className="form-error-label" ></span>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label-required" >Xác nhận mật khẩu:</label>
                  <input className="text-input" id="register-form-confirm-password" type="password" placeholder="Nhập lại mật khẩu ..." />
                  <div className="form-error-label-container">
                    <span className="form-error-label" ></span>
                  </div>
                </div>
                <div className="form-line pd-top-5px" />
                <div className="form-group mg-top-10px">
                  <div className="j-c-end">
                    <button className="blue-button" onClick={(e) => {
                      e.preventDefault();
                      this.handleFirstStep();
                    }}>Tiếp theo</button>
                  </div>
                </div>
              </div>
            </form>

            {/* Step 2 */}
            <form id="register-form-step-2">
              <div className="form-container" id="reg-step-2">
                <div className="form-group">
                  <label className="form-label-required">Email:</label>
                  <input type="text" className="text-input" id="register-form-email" placeholder="Nhập email ..." />
                  <div className="form-error-label-container">
                    <span className="form-error-label" ></span>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label-required">Xác nhận email:</label>
                  <input type="text" className="text-input" id="register-form-confirm-email" placeholder="Nhập lại email ..." />
                  <div className="form-error-label-container">
                    <span className="form-error-label" ></span>
                  </div>
                </div>

                <div className="form-group">
                  <div className="j-c-space-between">
                    <label className="form-label-required">Tên hiển thị:</label>
                    <HoverHint message="Tên này sẽ đại diện cho bạn và hiển thị với người dùng khác."></HoverHint>
                  </div>
                  <input type="text" className="text-input" id="register-form-displayname" placeholder="Nhập tên hiển thị ..." />
                  <div className="form-error-label-container">
                    <span className="form-error-label" ></span>
                  </div>
                </div>

                {/* Custom checkbox */}
                <div className="form-group pd-top-10px">

                  <CustomReCAPTCHA
                    id="register-ReCAPTCHA"
                    onTokenChange={value => this.onReCAPCHATokenChange(value)}
                  />
                  <div className="form-error-label-container">
                    <span className="form-error-label" ></span>
                  </div>
                </div>

                <div className="form-line pd-top-10px mg-bottom-10px" />

                <div className="form-group ">
                  <label className="form-checkbox-container" >
                    <input type="checkbox" className="form-checkbox" id="register-form-confirm-tos" />
                    <span className="form-checkbox-style"></span>
                    <div className="d-flex">
                      <div className="form-checkbox-label"> Đồng ý với </div>
                      <Link to="/login" className="link-label-s" style={{ marginTop: "0.05rem" }}>Điều khoản và dịch vụ</Link>
                    </div>
                  </label>
                  <div className="form-error-label-container">
                    <span className="form-error-label" ></span>
                  </div>
                </div>

                <div className="form-group mg-top-10px pd-top-10px">
                  <div className="j-c-space-between">
                    <div className="link-label-s" style={{ color: "var(--light-black)" }} onClick={(e) => {
                      e.preventDefault();
                      this.renderStep(1);
                    }}>{"<< Quay lại"}</div>
                    <button className="blue-button" onClick={(e) => {
                      e.preventDefault();
                      this.handleSecondStep();
                    }}>Đăng ký</button>
                  </div>
                </div>
              </div >
            </form>

            {/* Step 3 */}
            <form id="register-form-step-3">
              <div className="form-container o-f-hidden" id="reg-step-3">
                <div className="form-group">
                  <label className="form-label-required">Xác nhận email:</label>
                  <input type="text" className="text-input" maxLength={6} id="register-form-confirm-code" placeholder="Nhập mã xác nhận ..." />
                  <div className="form-error-label-container">
                    <span className="form-error-label" ></span>
                  </div>
                </div>
                <div className="form-line mg-top-10px" />
                <div className="form-group mg-top-10px">

                  <div className="j-c-end mg-top-10px">
                    <button className="blue-button" onClick={(e) => {
                      e.preventDefault();
                      this.handleThirdStep();
                    }}>Xác nhận</button>
                  </div>
                </div>
              </div >
            </form>

            <div className="mg-top-10px d-flex">
              <div style={{ marginTop: "3px", marginRight: "4px" }}> Nếu đã có tài khoản, bạn có thể</div> <Link to="/login" className="link-label-m">đăng nhập</Link>
            </div>

          </div >
        </div >
      </div >
    );
  }

}

const mapStateToProps = (state) => {
  console.log(state.auth);
  return {
    isSignedUp: state.auth.isSignedUp,
  };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  register
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Register));
