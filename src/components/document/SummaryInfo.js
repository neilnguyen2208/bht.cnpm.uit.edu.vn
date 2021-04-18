


import React, { Component } from 'react'

import 'components/styles/Button.scss'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
//resources
import { deleteADocument, editADocument, reportADocument } from 'redux/services/documentServices'
import { openBigModal, openModal, closeModal, openBLModal } from 'redux/services/modalServices'
import { validation } from 'utils/validationUtils'

//styles
import 'components/styles/Label.scss'
import 'components/styles/Metadata.scss'

//constants
import { itemType, mySelfMenuItemList, normalMenuItemList } from 'constants.js'

//components
import PopupMenu from 'components/common/PopupMenu/PopupMenu'

class DocumentSummary extends Component {

  constructor(props) {
    super(props);

    this.id = this.props.id;
    this.title = this.props.title;
    this.image = this.props.image;

  }

  onPopupMenuItemClick = (selectedItem) => {
    if (selectedItem.value === "DELETE_POST") {
      //show confirmation popup and detete id verify
      openModal("confirmation",
        {
          title: "Xoá bài viết",
          text: "Hành động này không cần phê duyệt và không thể hoàn tác.",
          confirmText: "Xác nhận",
          cancelText: "Huỷ",
          onConfirm: () => {
            this.props.deleteADocument(this.props.id);
            closeModal();
          }
        })
    }

    if (selectedItem.value === "EDIT_POST") {
      openBigModal("edit-document", { id: this.props.id });
    }

    if (selectedItem.value === "REPORT_POST") {
      openModal("form", {
        id: `rpdcm-form-modal`,//report document
        title: `REPORT BÀI VIẾT`,
        formId: `rpdcm-form`,
        inputs:
          [
            { //for rendering
              id: `rpdcm-form-input`,
              isRequired: true,
              label: "Lý do tố cáo:",
              type: 'text-area',
              placeHolder: "Nhập lý do tố cáo ",
              validation: true,
              key: "reason"
            },
          ],
        append: { id: this.props.id },
        validationCondition: {
          form: `#rpdcm-form`,
          rules: [
            //truyen vao id, loai component, message
            validation.isRequired(`rpdcm-form-input`, 'text-area', 'Lý do không được để trống!'),
            validation.minLength(`rpdcm-form-input`, 'text-area', 25, 'Lý do không được nhỏ hơn 25 ký tự!')
          ],

        },
        submitText: "Report",
        cancelText: "Huỷ",
        confirmBox: {
          title: "Report bài viết",
          text: "Bạn có chắc chắn muốn tố cáo bài viết này không?",
          confirmText: "Xác nhận",
          cancelText: "Huỷ",
          onConfirm: DTO => this.onConfirmReport(DTO)
        }
      });
    }
  }

  onConfirmReport = (DTO) => {
    closeModal();
    closeModal();
    this.props.reportADocument(DTO.id, { "reason": DTO.reason });
  }

  render() {

    //only set for report.
    if (this.props.isHaveReported) {
      openBLModal({ text: "Report bài viết thành công!", type: "success" });
    }

    let summary = <></>;
    if (this.props.imageURL && this.props.imageURL !== "null" && this.props.imageURL !== null && this.props.imageURL !== undefined) {
      summary = <div>
        <div className="decoration-line mg-top-5px" />
        <img className="image" src={this.props.imageURL} alt="" />
        <div className="summary-text mg-bottom-5px">
          {this.props.description}
        </div>
      </div>
    }
    else
      if (this.props.summary && this.props.summary !== "null")
        summary = <div className="summary-text" >
          {this.props.description}
        </div >
      else
        summary = <div className="ck-editor-output" dangerouslySetInnerHTML={{
          __html:
            this.props.description
        }} />


    return (
      <div className="metadata" >
        <div className="j-c-space-between"  >
          <div className="d-flex">
            <div className="d-flex">
              <div className="category">
                {this.props.categoryName}
              </div>
            </div>
            <div className="light-black-label">bởi</div>
            <Link className="link-label-s" to={/user/}>
              {this.props.authorName}
            </Link>

            {this.props.type === itemType.mySelf || this.props.type === itemType.approval ?
              <>{this.props.approveState === "PENDING_APPROVAL" ?
                <div className="d-flex" >
                  <div className="light-black-label"> - </div>
                  <div className="red-border-label">PENDING</div>
                </div >
                : <>
                  {this.props.approveState === "PENDING_FIX" ?
                    <div className="d-flex">
                      <div className="light-black-label"> - </div>
                      <div className="blue-border-label">PENDING</div>
                    </div> : <>
                      {this.props.approveState === "REJECTED" ?
                        <div className="d-flex">
                          <div className="light-black-label"> - </div>
                          <div className="red-border-label">REJECTED</div>
                        </div> :
                        <>
                          <div className="d-flex">
                            <div className="light-black-label"> - </div>
                            <div className="blue-border-label">APPROVED</div>
                          </div>
                        </>
                      }
                    </>
                  }
                </>
              }
              </>
              :
              <></>
            }
          </div>
          {this.props.type === itemType.mySelf &&
            <PopupMenu onMenuItemClick={this.onPopupMenuItemClick} items={mySelfMenuItemList} id={`${this.props.popUpMenuPrefix}-pipm-${this.props.id}`} /> //stand for document item poupup menu
          }
          {(this.props.type === itemType.normal || !this.props.type) &&
            <PopupMenu onMenuItemClick={this.onPopupMenuItemClick} items={normalMenuItemList} id={`${this.props.popUpMenuPrefix}-pipm-${this.props.id}`} />
          }
        </div>

        {/* title */}
        <div className="d-flex mg-top-5px" >
          {/* fake avatar */}
          < img className="avatar" src={this.props.authorAvatarURL} alt="" />
          <div className="mg-left-5px j-c-space-between d-flex-vertical">
            {/* <Link to={"/document-content/" + this.props.id}> */}
            <Link to={"/document-content/" + 151}>
              <div className="title">
                {this.props.title}
              </div>
            </Link>

            <div className="d-flex" style={{ marginTop: "-5px" }}>
              <div className="d-flex"  >
                <div className="metadata-label" style={{ marginLeft: "2px" }}>
                  {this.props.subjectName}
                </div>
              </div>

              <div className="d-flex" >
                {this.props.publishDtm ?
                  <div className="metadata-label" style={{ marginLeft: "2px" }}>
                    {this.props.publishDtm.substring(0, 10)}
                  </div>
                  : <></>}
              </div>
            </div>
          </div>
        </div>
        <div className="file-name">{this.props.fileName}</div>
        {summary}
        <div className="j-c-end">
          {/* <Link to={`/document-content/${this.props.id}`} className="continue-read mg-bottom-5px" > */}
          <Link to={`/document-content/${151}`} className="continue-read mg-bottom-5px" >
            Xem tài liệu >>
            </Link>
        </div>
      </div >
    );
  }



}

const mapStateToProps = (state) => {
  return {
    //report
    isHaveReported: state.document.isHaveReported
  };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  deleteADocument, editADocument, reportADocument
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DocumentSummary));

