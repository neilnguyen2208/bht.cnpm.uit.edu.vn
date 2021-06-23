import React from 'react'

import 'components/styles/Button.scss'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
//resources
import UserInfo from 'components/user/UserInfo'

//styles
import 'components/styles/Label.scss'
import 'components/styles/Metadata.scss'
import 'components/styles/Detail.scss'
import 'components/common/CustomCKE/CKEditorContent.scss'
import { formatMathemicalFormulas, styleCodeSnippet } from 'components/common/CustomCKE/CKEditorUtils';
import { getCurrentUserExerciseStatistic } from 'redux/services/courseServices'
import authService from 'authentication/authenticationServices';
import PopupMenu from 'components/common/PopupMenu/PopupMenu';
import { guestMenu } from './adapter/allActionSummaryMenu';
import { closeModal, openBigModal, openModal } from 'redux/services/modalServices';

class ExerciseInfo extends React.Component {

  componentDidMount() {

    //if user logged in => call API get user's statistic
    this.props.exerciseId && authService.isLoggedIn() && this.props.getCurrentUserExerciseStatistic(this.props.exerciseId)
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

  render() {
    styleCodeSnippet();

    let cover = <></>;
    if (this.props.imageURL && this.props.imageURL !== "null" && this.props.imageURL !== null && this.props.imageURL !== undefined) {
      cover = <div>
        <div className="mg-top-20px" />
        <img className="image" src={this.props.imageURL} alt="" />
      </div>
    }

    return (
      <div className="metadata">

        {/* title */}
        <Link to={"/post-content/" + this.props.exerciseId} onClick={this.props.type === "PREVIEW" && ((e) => { e.preventDefault() })}>
          <div className="title" >
            {this.props.title}
          </div>
        </Link>

        <div className="d-flex mg-top-5px  j-c-space-between"  >
          <div className="d-flex">
            <div className="category">
              {this.props.categoryName}
            </div>
            <div className="mg-left-5px">
              <div className="d-flex" style={{ marginTop: "-1px" }}>
                {this.props.publishDtm ?
                  <div className="metadata-label" style={{ marginLeft: "2px" }}>
                    {this.props.publishDtm.substring(0, 10)}
                  </div>
                  : <></>}
              </div>
            </div>
          </div>
          <div>
            {!this.props.isUserStatisticLoading && this.props.currentUserStatistic &&
              <div style={{ color: "var(--black)" }}>
                Kết quả tốt nhất của bạn: {this.props.currentUserStatistic.bestCorrectQuestions}/{this.props.totalQuestions}
              </div>
            }
          </div>
        </div>

        <div className="decoration-line mg-top-5px mg-bottom-5px" />
        <div className="d-flex mg-top-10px ">
          <UserInfo authorDisplayName={this.props.authorDisplayName} authorID={this.props.authorID} authorAvatarURL={this.props.authorAvatarURL} />
          <PopupMenu onMenuItemClick={this.props.type !== "PREVIEW" ? (selectedItem) => this.onPopupMenuItemClick(selectedItem) : () => { }}
            availableActions={this.props.availableActions} items={guestMenu}
            id={`${this.props.popUpMenuPrefix}-pxrcsi-pm-${this.props.exerciseId}`} />
        </div>
        {cover}

        {formatMathemicalFormulas()}
        {styleCodeSnippet()}
      </div >
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUserStatistic: state.course.currentUserExerciseStatistic.data,
    isUserStatisticLoading: state.course.currentUserExerciseStatistic.isLoading

  };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getCurrentUserExerciseStatistic
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ExerciseInfo));

