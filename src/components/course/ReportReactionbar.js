import React from 'react'

import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { resolveAPost } from 'redux/services/postServices';

//styles
import 'components/styles/Reactionbar.scss'
import 'components/styles/Label.scss'
import 'components/styles/Button.scss'
import { openModal } from 'redux/services/modalServices.js';
import { validation } from 'utils/validationUtils.js';

class ReportReactionbar extends React.Component {

  handleResolve = () => {
    openModal("form", {
      id: `rsae-form-modal`,//resolve an exerice
      title: `XỬ LÝ BÀI TẬP`,
      formId: `rsae-form`,
      inputs:
        [
          { //for rendering
            id: `rsae-combobox`,
            isRequired: true,
            label: "Hỉnh thức xử lý:",
            type: 'combobox',
            options: [
              { id: 1, name: "Duyệt báo cáo", value: "IN_PROGRESS" },
              { id: 2, name: "Đã xử lý", value: "FIXED" },
              { id: 3, name: "Không duyệt", value: "REJECTED" },
            ],
            selectedOptionID: 1,
            validation: true,
            key: "postReportActionType",
            onOptionChanged: (option) => {
              return option.value;
            }
          },
          { //for rendering
            id: `rsae-form-input`,
            isRequired: true,
            label: "Ghi chú:",
            type: 'text-area',
            placeHolder: "Nhập ghi chú xử lý bài tập ",
            validation: true,
            key: "resolvedNote"
          },
        ],
      // append: { id: this.props.id },
      validationCondition: {
        form: `#rsae-form`,
        rules: [
          validation.isRequired(`rsae-form-input`, 'text-area', 'Ghi chú không được để trống!'),
          validation.isRequired(`rsae-combobox`, 'combobox', 'Hình thức xử lý không được để trống!'),
          validation.minLength(`rsae-form-input`, 'text-area', 25, 'Ghi chú không được ít hơn 25 ký tự!'),
        ],

      },
      submitText: "Xác nhận",
      cancelText: "Huỷ",
      confirmBox: {
        title: "Xử lý bài tập",
        text: "Bạn có chắc chắn muốn xử lý báo cáo bài tập này không?",
        verifyText: "Xác nhận",
        cancelText: "Huỷ",
        onConfirm: DTO => this.onConfirmResolve(DTO)
      }
    });

  }

  onConfirmResolve = (resolveDTO) => {
    //if resolveDTO not change => KEEP ACTION
    if (!resolveDTO.postReportActionType)
      resolveDTO.postReportActionType = "KEEP";
    this.props.resolveAPost(this.props.id, resolveDTO)
  }

  render() {
    return (
      <div className="reaction-bar j-c-end pd-top-5px">
        <button className="blue-button" onClick={() => this.handleResolve()}>Xử lý bài tập</button>
      </div >
    );
  }

}

const mapStateToProps = (state) => {
  return {
  };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  resolveAPost
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ReportReactionbar));

