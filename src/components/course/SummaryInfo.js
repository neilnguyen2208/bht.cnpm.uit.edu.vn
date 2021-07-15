import React from 'react'

import 'components/styles/Button.scss'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
//resources

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
import { post_ReportAnExerciseReset } from 'redux/actions/courseAction';
import createDOMPurify from 'dompurify';

class ExerciseSummary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowMore: false
    }
  }

  componentDidMount() {
    const DOMPurify = createDOMPurify(window);
    const clean = DOMPurify.sanitize(this.props.description);
    if (document.querySelector(`#rprt-pst-ctnt-${this.props.exerciseID}`))
      document.querySelector(`#rprt-pst-ctnt-${this.props.exerciseID}`).innerHTML = clean;
  }

  onPopupMenuItemClick = (selectedItem) => {
    if (selectedItem.value === "DELETE_EXERCISE") {
      //show confirmation popup and detete id verify
      openModal("confirmation",
        {
          title: "Xoá bài tập",
          text: "Hành động này không cần phê duyệt và không thể hoàn tác.",
          confirmText: "Xác nhận",
          cancelText: "Huỷ",
          onConfirm: () => {
            this.props.deleteAPost(this.props.exerciseID);
            closeModal();
          }
        })
    }

    if (selectedItem.value === "EDIT_EXERCISE") {
      openBigModal("edit-post", { id: this.props.exerciseID });
    }

    if (selectedItem.value === "REPORT_EXERCISE") {
      openBigModal("report-exercise", {
        id: this.props.exerciseID
      })
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
      openBLModal({ text: "Report bài tập thành công!", type: "success" });
      store.dispatch(post_ReportAnExerciseReset())
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
                  <div className="ck-editor-output" id={"rprt-pst-ctnt-" + this.props.exerciseID} />
                </div>
                :
                <div className="summary-text">
                  <div className="ck-editor-output" id={"rprt-pst-ctnt-" + this.props.exerciseID} />
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
                  <div className="ck-editor-output" id={"rprt-pst-ctnt-" + this.props.exerciseID} />
                </div>
                :
                <div className="summary-text">
                  <div className="ck-editor-output" id={"rprt-pst-ctnt-" + this.props.exerciseID} />
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
            < PopupMenu onMenuItemClick={this.onPopupMenuItemClick} useAction={this.props.useAction} availableActions={this.props.availableActions} items={basicMenu} id={`${this.props.popUpMenuPrefix}-pipm-${this.props.exerciseID}`} /> //stand for post item poupup menu
          }
          {(this.props.type === itemType.normal || !this.props.type) && //normal => only report
            <PopupMenu
              onMenuItemClick={this.onPopupMenuItemClick}
              items={guestMenu}
              useAction={this.props.useAction}
              id={`${this.props.popUpMenuPrefix}-pipm-${this.props.exerciseID}`} />
          }
          {(this.props.type === itemType.management) &&
            <PopupMenu
              onMenuItemClick={this.onPopupMenuItemClick}
              useAction={this.props.useAction}
              availableActions={this.props.availableActions}
              items={adminMenu}
              id={`${this.props.popUpMenuPrefix}-pipm-${this.props.exerciseID}`} />
          }
        </div>

        {/* title */}
        <div className="d-flex mg-top-5px" >
          {/* fake avatar */}
          <Link to={`/user/profile/${this.props.authorID}`}>
            < img className="avatar" src={this.props.authorAvatarURL} alt="" />
          </Link>

          <div className="mg-left-5px j-c-space-between d-flex-vertical">
            <Link to={"/courses/exercise/" + this.props.exerciseID}>
              <div className="title">
                {this.props.title}
              </div>
            </Link>

            <div className="d-flex" style={{ marginTop: "-5px" }}>
              {this.props.subjectName ?
                <div className="metadata-label" style={{ marginLeft: "2px" }}>
                  {this.props.subjectName}
                </div>
                : <></>}
              {this.props.publishDtm ?
                <div className="metadata-label" style={{ marginLeft: "2px" }}>
                  {this.props.publishDtm.substring(0, 10)}
                </div>
                : <></>}
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
    isHaveReported: state.course.isHaveReported
  };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  highlightAPost,
  deleteHighlightAPost,
  stickAPostToTop
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ExerciseSummary));

