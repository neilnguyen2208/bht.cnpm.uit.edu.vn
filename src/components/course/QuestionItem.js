import React from 'react'

import 'components/styles/Button.scss'
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import flaged_icon from 'assets/icons/24x24/blue_flag_icon_24x24.png';
import unflaged_icon from 'assets/icons/24x24/gray_flag_icon_24x24.png';
import correct_f_icon from 'assets/icons/24x24/correct_icon_n_24x24.png'
import wrong_f_icon from 'assets/icons/24x24/wrong_icon_n_24x24.png'

//styles
import 'components/styles/Label.scss'
import 'components/styles/Button.scss'
import './QuestionItem.scss'
import { formatMathemicalFormulas, styleCodeSnippet } from 'components/common/CustomCKE/CKEditorUtils';
import correct_icon from 'assets/icons/24x24/correct_icon_24x24.png'
import wrong_icon from 'assets/icons/24x24/wrong_icon_24x24.png'
import PopupMenu from 'components/common/PopupMenu/PopupMenu';
import { guestMenu } from './adapter/allActionSummaryMenu';
import { closeModal, openBigModal, openCommentModal, openModal } from 'redux/services/modalServices';
import { RequireLogin } from 'components/base_components/RequireLoginComponent';
import { Post, PostAction } from 'authentication/permission.config';
import comment_icon from 'assets/icons/24x24/comment_icon_24x24.png'

//components
class QuestionItem extends React.Component {
  constructor(props) {
    super(props);
    this.isFlagged = false;
    this.isExplainationShown = false;
  }

  toggleFlagImage = () => {
    this.isFlagged = !this.isFlagged;
    this.setState({});
    this.props.onQuestionFlagged(this.props.questionId, this.isFlagged);
  }

  onAnswerChecked = (questionId, answer) => {
    //Create current answer object and replace in parent.
    this.props.onAnswerChecked(questionId, answer);
  }

  showOrHideExplaination = () => {
    if (this.isExplainationShown)
      document.getElementById("xrcs-xplntn" + this.props.questionId).style.display = "none";
    else
      document.getElementById("xrcs-xplntn" + this.props.questionId).style.display = "block";

    this.isExplainationShown = !this.isExplainationShown;
    this.setState({});

  }
  onPopupMenuItemClick = (selectedItem) => {
    if (selectedItem.value === "DELETE_EXERCISE") {
      //show confirmation popup and detete id verify
      openModal("confirmation",
        {
          title: "Xoá bài viết",
          text: "Hành động này không cần phê duyệt và không thể hoàn tác.",
          confirmText: "Xác nhận",
          cancelText: "Huỷ",
          onConfirm: () => {
            // this.props.deleteAPost(this.props.exerciseId);
            closeModal();
          }
        })
    }

    if (selectedItem.value === "EDIT_EXERCISE") {
      openBigModal("edit-post", { id: this.props.exerciseId });
    }

    if (selectedItem.value === "REPORT_EXERCISE") {
      openBigModal("report-exercise", {
        id: this.props.exerciseId
      })
    }

  }

  onCommentBtnClick = () => {
    openCommentModal();
  }


  render() {
    // 
    //#region like, unlike buttons
    let flagBtn = <div></div>;

    // render flagBtn
    if (this.isFlagged) {
      flagBtn = <div className="d-flex">
        <img className="save-btn" alt="like" src={flaged_icon} />
        <div className="save-btn-text" style={{ marginLeft: "5px" }}>Huỷ</div>
      </div>
    }
    else {
      flagBtn = <div className="d-flex" >
        <img className="save-btn" alt="dislike" src={unflaged_icon} />
        <div className="save-btn-text" style={{ marginLeft: "5px" }}>Đặt cờ</div>
      </div >
    }
    return (
      //add id for navigation
      <div className="question-item" id={"qsitm-" + this.props.questionId} style={{ scrollMarginTop: "80px" }}>
        <div className="w-100-percents">
          <div className="j-c-space-between">
            <div className="j-c-space-between w-100-percents">
              <div className="d-flex">
                <div className="question-index">
                  Câu {this.props.index + 1}:
                </div>
                <div>
                  {this.props.isChecked && this.props.isCorrect && <div style={{ position: "relative" }}>
                    <img style={{ width: "auto", height: "20px", marginTop: "-2px", marginLeft: "5px" }} src={correct_icon} alt="" /></div>}
                  {this.props.isChecked && !this.props.isCorrect && <div style={{ position: "relative" }}>
                    <img style={{ width: "auto", height: "20px", marginTop: "-2px", marginLeft: "5px" }} src={wrong_icon} alt="" />
                  </div>}
                </div>
              </div>

              <div className="d-flex">
                <PopupMenu onMenuItemClick={this.props.type !== "PREVIEW" ? (selectedItem) => this.onPopupMenuItemClick(selectedItem) : () => { }}
                  availableActions={this.props.availableActions} items={guestMenu}
                  id={`${this.props.popUpMenuPrefix}-xrcs-qstn-itm-pm-${this.props.questionId}`} />
              </div>

            </div>

          </div>
          <div className="ck-editor-output question-content" style={{ fontSize: "15px" }}
            dangerouslySetInnerHTML={{
              __html:
                this.props.content
            }}
          />

          {/* answer items */}
          {
            this.props.answers.map(answer => {
              return <div className="answer-item" key={answer.id} style={{ fontSize: "15px" }}  >
                <label className="container">


                  <input type="radio" checked={this.props.isChecked && this.props.answersSelected.includes(answer.id)}
                    onClick={!this.props.isChecked ? () => this.onAnswerChecked(this.props.questionId, answer) : (e) => { e.preventDefault() }}
                    name={"fieldset" + this.props.questionId} />

                  <div className="d-flex">
                    <div className="answer-container ck-editor-output" style={{ fontSize: "15px" }}
                      dangerouslySetInnerHTML={{
                        __html: answer.content
                      }} />
                    {
                      this.props.isChecked
                      && !this.props.isCorrect
                      && this.props.answersSelected.length > 0
                      && this.props.answersSelected.includes(answer.id)
                      && <img src={wrong_f_icon} style={{ width: "auto", height: "16px", marginTop: "2px", marginLeft: "5px" }} alt="" ></img>
                    }
                    {
                      this.props.isChecked
                      && !this.props.isCorrect
                      // && this.props.answersSelected.length > 0
                      && this.props.correctAnswers.includes(answer.id)
                      && <img src={correct_f_icon} style={{ width: "auto", height: "16px", marginTop: "2px", marginLeft: "10px" }} alt="" ></img>
                    }
                  </div>
                  <span className="checkmark"></span>
                </label>
              </div>
            })
          }

          {
            this.props.explaination && <div className="mg-bottom-10px">
              <button className="white-button" onClick={() => this.showOrHideExplaination()}>
                {this.isExplainationShown ? "Ẩn giải thích" : "Xem giải thích"}
              </button>
              <div className="exercise-explaination d-none" id={"xrcs-xplntn" + this.props.questionId}>
                {this.props.explaination}
              </div>
            </div>
          }
        </div>
        <div className="question reaction-bar" style={{ borderTop: "1px solid var(--gray)", paddingBottom: "5px", paddingTop: "5px", margin: "0px", marginTop: "20px" }}>
          <div className="flag-btn-container" onClick={this.toggleFlagImage}>
            <div className="d-flex"> {flagBtn}</div>
          </div>
          <RequireLogin permissions={[Post.Comment.POSTCOMMENT_PUBLIC_SELF_CREATE]}
            availableActions={this.props.availableActions}
            requiredAction={PostAction.Comment}
            useAction={this.props.useAction}
            expectedEvent={this.props.type !== "PREVIEW" && this.onCommentBtnClick}   >
            <div className="exercise comment-count-container">
              {/* <img className="save-btn" alt="dislike" src={comment_icon} /> */}
              <div className="comment-btn-text">Bình luận</div>
            </div>
          </RequireLogin>
        </div >
        {formatMathemicalFormulas()}
        {styleCodeSnippet()}
      </div >);
  }
}

const mapStateToProps = (state) => {
  return {

  };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(QuestionItem));

