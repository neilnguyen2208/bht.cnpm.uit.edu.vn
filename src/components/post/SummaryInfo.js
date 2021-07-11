import React from 'react'

import 'components/styles/Button.scss'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
//resources

import { deleteAPost, editAPost, reportAPost } from 'redux/services/postServices'
import { openBigModal, openModal, closeModal, openBLModal } from 'redux/services/modalServices'
import { highlightAPost, deleteHighlightAPost, stickAPostToTop } from 'redux/services/homeServices';
import { post_ReportAPostReset } from 'redux/actions/postAction'
import store from 'redux/store/index'
import danger_icon from 'assets/icons/24x24/nb_orange_danger_icon_24x24.png'

import { basicMenu, adminMenu, guestMenu } from './adapter/actionMenu'

//styles
import 'components/styles/Label.scss'
import 'components/styles/Metadata.scss'

//constants
import { itemType } from 'constants.js'

//components
import PopupMenu from 'components/common/PopupMenu/PopupMenu'
import { formatMathemicalFormulas, styleCodeSnippet } from 'components/common/CustomCKE/CKEditorUtils';

class PostSummary extends React.Component {

  constructor(props) {
    super(props);

    this.id = this.props.postID;
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
            this.props.deleteAPost(this.props.postID);
            closeModal();
          }
        })
    }

    if (selectedItem.value === "EDIT_POST") {
      openBigModal("edit-post", { id: this.props.postID });
    }

    if (selectedItem.value === "REPORT_POST") {
      openBigModal("report-post", {
        id: this.props.postID
      })
    }

    if (selectedItem.value === "HIGHLIGHT_POST") {
      openModal("confirmation", {
        title: "Ghim bài viết",
        text: "Xác nhận ghim bài viết?",
        onConfirm: () => {
          this.props.highlightAPost(this.props.postID);
          closeModal();
        }
      });
    }

    if (selectedItem.value === "UNHIGHLIGHT_POST") {
      openModal("confirmation", {
        title: "Bỏ ghim bài viết",
        text: "Xác nhận bỏ ghim bài viết?",
        onConfirm: () => {
          this.props.deleteHighlightAPost(this.props.postID);
          closeModal();
        }
      });
    }

    if (selectedItem.value === "STICK_TO_TOP_POST") {
      openModal("confirmation", {
        title: "Ghim bài viết lên đầu",
        text: "Xác nhận ghim bài viết lên đâu?",
        onConfirm: () => {
          this.props.stickAPostToTop(this.props.postID);
          closeModal();
        }
      });
    }
  }

  onConfirmReport = (DTO) => {
    closeModal();
    closeModal();
    this.props.reportAPost(DTO.id, { "reasonIds": [1], "feedback": DTO.reason });
  }

  render() {
    //only set for report.

    styleCodeSnippet()
    if (this.props.isHaveReported) {
      openBLModal({ text: "Report bài viết thành công!", type: "success" });
      store.dispatch(post_ReportAPostReset())
    }

    let summary = <></>;
    if (this.props.imageURL && this.props.imageURL !== "null" && this.props.imageURL !== null && this.props.imageURL !== undefined) {
      summary = <div>
        <div className="decoration-line mg-top-10px" />
        <img className="image" src={this.props.imageURL} alt="" />
        <div className="summary-text mg-bottom-10px">
          {this.props.summary}
        </div>

      </div>
    }
    else
      if (this.props.summary && this.props.summary !== "null")
        summary = <div className="summary-text" >
          {this.props.summary}
        </div >
      else
        summary = <div className="ck-editor-output" dangerouslySetInnerHTML={{
          __html:
            this.props.content
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
            <Link className="link-label-s" to={`/user/profile/${this.props.authorID}`}>
              {this.props.authorDisplayName}
            </Link>

            {this.props.type === itemType.mySelf || this.props.type === itemType.approval || this.props.type === itemType.management ?
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
          {this.props.type !== itemType.management && this.props.type !== itemType.normal &&
            < PopupMenu onMenuItemClick={this.onPopupMenuItemClick} useAction={this.props.useAction} availableActions={this.props.availableActions} items={basicMenu} id={`${this.props.popUpMenuPrefix}-pipm-${this.props.postID}`} /> //stand for post item poupup menu
          }
          {(this.props.type === itemType.normal || !this.props.type) && //normal => only report
            <PopupMenu
              onMenuItemClick={this.onPopupMenuItemClick}
              items={guestMenu}
              useAction={this.props.useAction}
              id={`${this.props.popUpMenuPrefix}-pipm-${this.props.postID}`} />
          }
          {(this.props.type === itemType.management) &&
            <PopupMenu
              onMenuItemClick={this.onPopupMenuItemClick}
              useAction={this.props.useAction}
              availableActions={this.props.availableActions}
              items={adminMenu}
              id={`${this.props.popUpMenuPrefix}-pipm-${this.props.postID}`} />
          }
        </div>

        {/* title */}
        <div className="d-flex mg-top-5px" >
          {/* fake avatar */}
          <Link to={`/user/profile/${this.props.authorID}`}>
            < img className="avatar" src={this.props.authorAvatarURL} alt="" />
          </Link>

          <div className="mg-left-5px j-c-space-between d-flex-vertical">
            <Link to={"/post-content/" + this.props.postID}>
              <div className="title">
                {this.props.title}
              </div>
            </Link>

            <div className="d-flex" style={{ marginTop: "-5px" }}>
              <div className="d-flex"  >
                <div className="metadata-label" style={{ marginLeft: "2px" }}>
                  {Math.ceil(this.props.readingTime / 60) + " phút đọc"}
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
        {formatMathemicalFormulas()}
        {styleCodeSnippet()}

      </div >
    );
  }
}

const mapStateToProps = (state) => {
  return {
    //report
    isHaveReported: state.post.isHaveReported
  };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  deleteAPost,
  editAPost,
  reportAPost,
  highlightAPost,
  deleteHighlightAPost,
  stickAPostToTop
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostSummary));

