import React, { Component } from 'react'

import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { resolveAPost } from 'redux/services/postServices';

//styles
import 'components/styles/Reactionbar.scss'
import 'components/styles/Label.scss'
import 'components/styles/Button.scss'
import { openModal, closeModal, openBLModal } from 'redux/actions/modalAction.js';
import store from 'redux/store/index.js';
import { validation } from 'utils/validationUtils.js';
import { post_ResolveAPostReset } from 'redux/actions/postAction'
import done_icon from 'assets/icons/24x24/done_icon_24x24.png'

class ReportReactionbar extends Component {

  handleResolve = () => {
    store.dispatch(openModal("form", {
      id: `rsap-form-modal`,//resolve a post
      title: `XỬ LÝ BÀI VIẾT`,
      formId: `rsap-form`,
      inputs:
        [
          { //for rendering
            id: `rsap-combobox`,
            isRequired: true,
            label: "Hỉnh thức xử lý:",
            type: 'combobox',
            options: [{ id: 1, name: "Giữ lại", value: "KEEP" }, { id: 2, name: "Xoá", value: "DELETE" }],
            selectedOptionID: 1,
            validation: true,
            key: "postReportActionType",
            onOptionChanged: (option) => {
              return option.value;
            }
          },
          { //for rendering
            id: `rsap-form-input`,
            isRequired: true,
            label: "Ghi chú:",
            type: 'text-area',
            placeHolder: "Nhập ghi chú xử lý bài viết ...",
            validation: true,
            key: "resolvedNote"
          },
        ],
      // append: { id: this.props.id },
      validationCondition: {
        form: `#rsap-form`,
        rules: [
          validation.isRequired(`rsap-form-input`, 'text-area', 'Ghi chú không được để trống!'),
          validation.isRequired(`rsap-combobox`, 'combobox', 'Hình thức xử lý không được để trống!'),
          validation.minLength(`rsap-form-input`, 'text-area', 25, 'Ghi chú không được ít hơn 25 ký tự!'),
        ],

      },
      submitText: "Xác nhận",
      cancelText: "Huỷ",
      confirmBox: {
        title: "Xử lý bài viết",
        text: "Bạn có chắc chắn muốn xử lý báo cáo bài viết này không?",
        verifyText: "Xác nhận",
        cancelText: "Huỷ",
        onConfirm: DTO => this.onConfirmResolve(DTO)
      }
    }));

  }

  onConfirmResolve = (resolveDTO) => {
    this.props.resolveAPost(this.props.id, resolveDTO)
  }

  render() {

    if (this.props.isHaveResolved) {
      store.dispatch(closeModal());
      store.dispatch(closeModal());
      this.props.reloadList();
      store.dispatch(post_ResolveAPostReset());
      store.dispatch(openBLModal({ icon: done_icon, text: "Xử lý bài viết thành công!" }))
    }

    return (
      <div className="reaction-bar j-c-end pd-top-5px">
        <button className="blue-button" onClick={() => this.handleResolve()}>Xử lý bài viết</button>
      </div >
    );
  }

}

const mapStateToProps = (state) => {
  return {
    isHaveResolved: state.post.isHaveResolved
  };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  resolveAPost
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ReportReactionbar));

