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

const validationCondition = {
  form: '#login-form',
  rules: [
    //truyen vao id, loai component, message
    validation.isRequired('login-form-title', 'text-input', 'Tên đăng nhập không được để trống!'),
    validation.noSpecialChar('login-form-title', 'text-input', 'Tên tài liệu không được chứa ký tự đặc biệt!'),
    validation.isRequired('login-form-category-combobox', 'combobox', 'Danh mục không được để trống'),
    validation.isRequired('login-form-cke', 'ckeditor', 'Nội dung tài liệu không được để trống'),
    validation.isRequired('login-form-subject-combobox', 'combobox', 'Môn học không được để trống')

  ],
}

class Login extends React.Component {

  componentDidMount() {
    validation(validationCondition);
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
      <div>
        <form className="login-form">
          <div class="form-container">
            <div class="form-group">
              <label class="form-label-required"  >Username:</label>
              <input type="text" class="text-input" placeholder="enter your name" />
            </div>
            <div class="form-group">
              <label class="form-label-required" >Password:</label>
              <input type="text" class="text-input" placeholder="enter password" />
            </div>
            <div class="form-group">
              <Link to="/forgot-password" class="forgot">Quên mật khẩu</Link>
            </div>
            <div class="form-group button-login">
              <button class="blue-button">Sign in <i class="fas fa-arrow-right"></i></button>
            </div>
          </div>
        </form>
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
