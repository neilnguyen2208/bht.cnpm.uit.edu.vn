import React from 'react'

import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { resolveADocument } from 'redux/services/documentServices';

//styles
import 'components/styles/Reactionbar.scss'
import 'components/styles/Label.scss'
import 'components/styles/Button.scss'
import { openModal } from 'redux/services/modalServices.js';
import { validation } from 'utils/validationUtils.js';

class ReportReactionbar extends React.Component {

  handleResolve = () => {
    openModal("form", {
      id: `rsadcm-form-modal`,//resolve a document
      title: `XỬ LÝ TÀI LIỆU`,
      formId: `rsadcm-form`,
      inputs:
        [
          { //for rendering
            id: `rsadcm-combobox`,
            isRequired: true,
            label: "Hỉnh thức xử lý:",
            type: 'combobox',
            options: [{ id: 1, name: "Giữ lại", value: "KEEP" }, { id: 2, name: "Xoá", value: "DELETE" }],
            selectedOptionID: 1,
            validation: true,
            key: "docReportActionType",
            onOptionChanged: (option) => {
              return option.value;
            }
          },
          { //for rendering
            id: `rsadcm-form-input`,
            isRequired: true,
            label: "Ghi chú:",
            type: 'text-area',
            placeHolder: "Nhập ghi chú xử lý tài liệu ",
            validation: true,
            key: "resolvedNote"
          },
        ],

      validationCondition: {
        form: `#rsadcm-form`,
        rules: [
          validation.isRequired(`rsadcm-form-input`, 'text-area', 'Ghi chú không được để trống!'),
          validation.isRequired(`rsadcm-combobox`, 'combobox', 'Hình thức xử lý không được để trống!'),
          validation.minLength(`rsadcm-form-input`, 'text-area', 25, 'Ghi chú không được ít hơn 25 ký tự!'),
        ],

      },
      submitText: "Xác nhận",
      cancelText: "Huỷ",
      confirmBox: {
        title: "Xử lý tài liệu",
        text: "Bạn có chắc chắn muốn xử lý báo cáo tài liệu này không?",
        verifyText: "Xác nhận",
        cancelText: "Huỷ",
        onConfirm: DTO => this.onConfirmResolve(DTO)
      }
    });

  }

  onConfirmResolve = (resolveDTO) => {
    if (!resolveDTO.docReportActionType)
      resolveDTO.docReportActionType = "KEEP";
    this.props.resolveADocument(this.props.documentID, resolveDTO)
  }

  render() {
    return (
      <div className="reaction-bar j-c-end pd-top-5px">
        <button className="blue-button" onClick={() => this.handleResolve()}>Xử lý tài liệu</button>
      </div >
    );
  }

}

const mapStateToProps = (state) => {
  return {
  };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  resolveADocument
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ReportReactionbar));

