import React from 'react'

import 'components/styles/Button.scss'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import { withRouter, Redirect } from "react-router-dom";
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
import { adminMenu, basicMenu, guestMenu } from './adapter/actionMenu';
import { closeModal, openBigModal, openModal } from 'redux/services/modalServices';
import { exerciseAction } from 'authentication/permission.config';
import edit_icon from 'assets/icons/24x24/nb_gray_write_icon_24x24.png'

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
      openBigModal("edit-exercise", { id: this.props.exerciseId });
    }

    if (selectedItem.value === "REPORT_EXERCISE") {
      openBigModal("report-exercise", {
        id: this.props.exerciseId
      })
    }

    if (selectedItem.value === "EDIT_EXERCISE_QUESTIONS") {
      return <Redirect to={`/edit-exercise/questions/${this.props.match.params.id}`} />
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
        <Link to={"/courses/exercise/" + this.props.exerciseId} onClick={this.props.type === "PREVIEW" && ((e) => { e.preventDefault() })}>
          <div className="title" >
            {this.props.title}
          </div>
        </Link>

        <div className="d-flex mg-top-5px j-c-space-between"  >
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
            {!this.props.isUserStatisticLoading && this.props.currentUserStatistic.bestCorrectQuestions && authService.isLoggedIn() &&
              <div style={{ color: "var(--black)" }}>
                Kết quả tốt nhất của bạn: {this.props.currentUserStatistic.bestCorrectQuestions}/{this.props.totalQuestions}
              </div>
            }
          </div>
        </div>

        <div className="decoration-line mg-top-5px mg-bottom-5px" />
        <div className="d-flex mg-top-10px ">
          <UserInfo authorDisplayName={this.props.authorDisplayName} authorID={this.props.authorID} authorAvatarURL={this.props.authorAvatarURL} />
          {/* <PopupMenu onMenuItemClick={this.props.type !== "PREVIEW" ? (selectedItem) => this.onPopupMenuItemClick(selectedItem) : () => { }}
            availableActions={this.props.availableActions} items={guestMenu}
            id={`${this.props.popUpMenuPrefix}-pxrcsi-pm-${this.props.exerciseId}`} /> */}
          <PopupMenu
            onMenuItemClick={this.onPopupMenuItemClick}
            useAction={this.props.useAction}
            availableActions={this.props.availableActions}
            items={[...basicMenu, {
              id: 4,
              text: "Cập nhật câu hỏi",
              isLink: true,
              to: "/edit-exercises/questions/" + this.props.match.params.id, //update later
              icon: edit_icon,
              value: "EDIT_EXERCISE_QUESTIONS",
              permissions: [],
              showOnPermission: false,
              showOnAction: true,
              requiredAction: exerciseAction.Update
            }]}
            id={`${this.props.popUpMenuPrefix}-cipm-${this.props.exerciseID}`} />
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

