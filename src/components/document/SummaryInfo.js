


import React from 'react'

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
import { itemType, mySelfMenuItemList } from 'constants.js'

//components
import PopupMenu from 'components/common/PopupMenu/PopupMenu'
import { basicMenu, guestMenu } from 'components/document/adapter/actionMenu';

class DocumentSummary extends React.Component {

  constructor(props) {
    super(props);

    this.id = this.props.documentID;
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
            this.props.deleteADocument(this.props.documentID);
            closeModal();
          }
        })
    }

    if (selectedItem.value === "EDIT_POST") {
      openBigModal("edit-document", { id: this.props.documentID });
    }

    if (selectedItem.value === "REPORT_POST") {
      openBigModal("report-document", { id: this.props.documentID });
    }
  }

  onConfirmReport = (DTO) => {
    closeModal();
    closeModal();
    this.props.reportADocument(DTO.id, { "reasonIds": [1], "feedback": DTO.reason });
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
              {this.props.authorDisplayName}
            </Link>

            {this.props.type === itemType.mySelf || this.props.type === itemType.approval ?
              <>{this.props.approveState === "PENDING_APPROVAL" ?
                <div className="d-flex" >
                  <div className="light-black-label"> - </div>
                  <div className="gray-border-label">PENDING</div>
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
            <PopupMenu onMenuItemClick={this.onPopupMenuItemClick} items={mySelfMenuItemList} id={`${this.props.popUpMenuPrefix}-dipm-${this.props.documentID}`} /> //stand for document item poupup menu
          }
          {(this.props.type === itemType.normal || !this.props.type) &&

            //create adapter later
            <PopupMenu onMenuItemClick={this.onPopupMenuItemClick}
              items={guestMenu}
              useAction={this.props.useAction}
              id={`${this.props.popUpMenuPrefix}-pipm-${this.props.documentID}`} />
          }
        </div>

        {/* title */}
        <div className="d-flex mg-top-5px" >
          <Link to={`/user/profile/${this.props.authorID}`}>
            < img className="avatar" src={this.props.authorAvatarURL} alt="" />
          </Link>

          <div className="mg-left-5px j-c-space-between d-flex-vertical">
            <Link to={"/document-content/" + this.props.documentID}>
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
        {/* <div className="file-name">{this.props.fileName}</div> */}
        {summary}
        <div className="j-c-end">
          <Link to={`/document-content/${this.props.documentID}`} className="continue-read mg-bottom-5px" >
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

