


import React from 'react'

import 'components/styles/Button.scss'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
//resources
import {
  deleteADocument,
  editADocument,
  reportADocument
} from 'redux/services/documentServices'
import {
  openBigModal,
  openModal,
  closeModal,
  openBLModal
} from 'redux/services/modalServices'
import danger_icon from 'assets/icons/24x24/nb_orange_danger_icon_24x24.png'

//styles
import 'components/styles/Label.scss'
import 'components/styles/Metadata.scss'

import published_icon from 'assets/icons/24x24/published_icon.png';
import not_published_icon from 'assets/icons/24x24/not_published_icon.png';
//constants
import { itemType, mySelfMenuItemList } from 'constants.js'

//components
import PopupMenu from 'components/common/PopupMenu/PopupMenu'
import { basicMenu, guestMenu, adminMenu } from 'components/document/adapter/actionMenu';
import createDOMPurify from 'dompurify';

class DocumentSummary extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isShowMore: false
    }
  }

  componentDidMount() {
    const DOMPurify = createDOMPurify(window);
    const clean = DOMPurify.sanitize(this.props.description);
    if (document.querySelector(`#rprt-pst-ctnt-${this.props.documentID}`))
      document.querySelector(`#rprt-pst-ctnt-${this.props.documentID}`).innerHTML = clean;
  }

  onPopupMenuItemClick = (selectedItem) => {
    if (selectedItem.value === "DELETE_DOCUMENT") {
      //show confirmation popup and detete id verify
      openModal("confirmation",
        {
          title: "Xoá tài liệu",
          text: "Hành động này không cần phê duyệt và không thể hoàn tác.",
          confirmText: "Xác nhận",
          cancelText: "Huỷ",
          onConfirm: () => {
            this.props.deleteADocument(this.props.documentID);
            closeModal();
          }
        })
    }

    if (selectedItem.value === "EDIT_DOCUMENT") {
      openBigModal("edit-document", { id: this.props.documentID });
    }

    if (selectedItem.value === "REPORT_DOCUMENT") {
      openBigModal("report-document", { id: this.props.documentID });
    }
  }

  render() {

    //only set for report.
    if (this.props.isHaveReported) {
      openBLModal({ text: "Report tài liệu thành công!", type: "success" });
    }

    let summary = <></>;
    //image + summary
    if (!this.props.description && this.props.imageURL && this.props.imageURL !== "null" && this.props.imageURL !== null && this.props.imageURL !== undefined) {
      summary = <div>
        <div className="decoration-line mg-top-10px" />
        <img className="image" src={this.props.imageURL} alt="" />
        <div className="summary-text mg-bottom-10px">
          {this.props.summary + "..."}
        </div>

      </div>
    }

    //summary only
    else
      if (!this.props.description && this.props.summary && this.props.summary !== "null" && this.props.summary !== "undefined")
        summary = <div className="summary-text" >
          {this.props.summary + "..."}
        </div >
      else summary = <div> {
        this.state.isShowMore ?
          <div className="post-summary-show show-more">
            {
              this.props.imageURL ?
                <div >
                  <div className="decoration-line mg-top-10px" />
                  <img className="image" src={this.props.imageURL} alt="" />
                  <div className="ck-editor-output" id={"rprt-pst-ctnt-" + this.props.documentID} />
                </div>
                :
                <div className="summary-text">
                  <div className="ck-editor-output" id={"rprt-pst-ctnt-" + this.props.documentID} />
                </div>
            }
          </div>
          :
          <div className="post-summary-show show-less">
            {
              this.props.imageURL ?
                <div >
                  <div className="decoration-line mg-top-10px" />
                  <img className="image" src={this.props.imageURL} alt="" />
                  <div className="ck-editor-output" id={"rprt-pst-ctnt-" + this.props.documentID} />
                </div>
                :
                <div className="summary-text">
                  <div className="ck-editor-output" id={"rprt-pst-ctnt-" + this.props.documentID} />
                </div>
            }</div>
      }</div>

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

            {this.props.type === itemType.mySelf || this.props.type === itemType.approval || this.props.type === itemType.management ?
              <>{this.props.approveState === "PENDING_APPROVAL" ?
                <div className="d-flex" >
                  <div className="light-black-label"> - </div>
                  <div className="black-border-label">PENDING</div>
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

            {(this.props.type === itemType.mySelf || this.props.type === itemType.approval || this.props.type === itemType.management) && this.props.docBusinessState === "PUBLIC" ?
              <div className="publish-status d-flex" style={{
                width: "88px",
                height: "20px",
                lineHeight: "16px",
                fontSize: "16px",
                border: "1px solid var(--blue)",
                borderRadius: "3px",
                marginLeft: "5px",
                padding: "1px",
                paddingLeft: "5px",
                paddingRight: "5px",
              }} >
                <img src={published_icon} alt="" style={{ marginRight: "3px " }} />
                <div className="d-flex" > Published </div>
              </div> : <></>
            }

            {(this.props.type === itemType.mySelf || this.props.type === itemType.approval || this.props.type === itemType.management) && this.props.docBusinessState === "UNLISTED" ?
              <div className="publish-status d-flex" style={{
                width: "110px",
                height: "20px",
                lineHeight: "16px",
                fontSize: "16px",
                border: "1px solid var(--black)",
                borderRadius: "3px",
                marginLeft: "5px",
                padding: "1px",
                color: "var(--black)",
                paddingLeft: "5px",
                paddingRight: "5px",
              }} >
                <img src={not_published_icon} alt="" style={{ marginRight: "3px " }} />
                <div className="d-flex" > Not published </div>
              </div> : <></>}
          </div>
          {this.props.type !== itemType.management && this.props.type !== itemType.normal &&
            < PopupMenu
              onMenuItemClick={this.onPopupMenuItemClick}
              useAction={this.props.useAction}
              availableActions={this.props.availableActions}
              items={basicMenu}
              id={`${this.props.popUpMenuPrefix}-dipm-${this.props.documentID}`} /> //stand for document item poupup menu
          }
          {(this.props.type === itemType.normal || !this.props.type) && //normal => only report
            <PopupMenu
              onMenuItemClick={this.onPopupMenuItemClick}
              items={guestMenu}
              useAction={this.props.useAction}
              id={`${this.props.popUpMenuPrefix}-dipm-${this.props.documentID}`} />
          }
          {(this.props.type === itemType.management) &&
            <PopupMenu
              onMenuItemClick={this.onPopupMenuItemClick}
              useAction={this.props.useAction}
              availableActions={this.props.availableActions}
              items={adminMenu}
              id={`${this.props.popUpMenuPrefix}-dipm-${this.props.documentID}`} />
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

        {this.props.approveState === "PENDING_FIX" ?
          <div className="feedback-container">
            <div className="d-flex">
              <img className="danger-icon" src={danger_icon} alt="!" />
              <div>Feedback:</div>
            </div>
            <div className="feedback-reason">
              {this.props.feedback}
            </div>
          </div>
          : <></>}
        {summary}
        <div className="j-c-end">
          {this.props.approveState !== "PENDING_APPROVAL" &&
            <Link to={`/document-content/${this.props.documentID}`} className="continue-read mg-bottom-5px" >
            Xem tài liệu >>
            </Link>
          }
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

