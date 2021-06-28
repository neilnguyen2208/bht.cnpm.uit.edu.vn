import React from 'react'

import 'components/styles/Button.scss'

import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

//services
import { getAnExerciseComments } from "redux/services/exerciseCommentServices"

//styles
import 'components/styles/Label.scss'
import 'components/styles/Metadata.scss'
import 'components/styles/Comment.scss'

//components
import Comment from './Comment.js'
import CreateComment from './CreateComment';
import CommentLoader from 'components/common/Loader/CommentLoader';
import Paginator from 'components/common/Paginator/ServerPaginator';
import store from 'redux/store';
import { openBLModal } from 'redux/services/modalServices';
import {
  delete_AnExerciseCommentReset,
  post_ReportAnExerciseCommentReset,
  put_EditAnExerciseCommentReset
} from 'redux/actions/exerciseCommentAction';
import { exerciseAction } from 'authentication/permission.config.js';

class CommentSection extends React.Component {

  componentDidMount() {
    this.props.getAnExerciseComments(this.props.exerciseId, 0);
  }

  handleEditorChange = () => { }

  onPageChange = (pageNumber) => {
    this.pageNumber = pageNumber;
    this.props.getAnExerciseComments(this.props.exerciseId, pageNumber - 1);
    this.setState({})
  }

  reloadList = () => {
    this.props.getAnExerciseComments(this.props.exerciseId, this.pageNumber - 1);
  }

  render() {

    let commentsList = <></>;
    if (this.props.isHaveDeleted) {
      this.reloadList()
      openBLModal({ type: "success", text: "Xoá bình luận thành công!" });
      store.dispatch(delete_AnExerciseCommentReset())
    }

    if (this.props.isHaveEdited) {
      this.reloadList();
      openBLModal({ type: "success", text: "Chỉnh sửa bình luận thành công!" });
      store.dispatch(put_EditAnExerciseCommentReset())
    }

    if (this.props.isHaveReported) {
      openBLModal({ type: "success", text: "báo cáo bình luận thành công!" });
      store.dispatch(post_ReportAnExerciseCommentReset())
    }

    if (!this.props.isLoading && this.props.commentsList)
      if (this.props.commentsList.length === 0) {
        commentsList = <div>Không có bình luận nào</div>
      }

      else commentsList = <div className="comments-list">  {
        this.props.commentsList.map(comment => {
          return <Comment
            commentId={comment.id}
            key={comment.id}
            authorDisplayName={comment.authorDisplayName}
            authorID={comment.authorID}
            authorAvatarURL={comment.authorAvatarURL}
            isContentAuthor={comment.isContentAuthor}
            submitDtm={comment.submitDtm}
            lastEditedDtm={comment.lastEditedDtm}
            authorId={comment.authorID}
            likeCount={comment.likeCount}
            likeStatus={comment.likeStatus}
            replyCount={comment.childCommentCount}
            content={comment.content}
            reloadList={() => this.reloadList()}
            availableActions={comment.availableActions}
          />
        })}
        < Paginator config={{
          changePage: (pageNumber) => this.onPageChange(pageNumber),
          pageCount: this.props.totalPages,
          currentPage: this.pageNumber ? this.pageNumber : 1
        }} />
      </div >
    return (
      // cst:comment section title
      <div className="exercise comments-container">
        {this.props.exerciseData && !this.props.isExerciseLoading ?
          <div>
            <div className="section-title"
              style={{ borderBottom: "1px solid var(--gray)", paddingBottom: "5px" }}
              id={"cst-" + 2}>{this.props.exerciseData.commentCount}
              Bình luận
            </div>
          </div>
          : <></>
        }
        <div className=" scroller-container">
          {this.props.exerciseAvailableActions.includes(exerciseAction.Comment) &&
            <CreateComment
              exerciseId={this.props.exerciseId}
            />}
          {!this.props.isLoading && this.props.commentsList ?
            <div>
              {commentsList}
            </div>
            :
            <div>
              <CommentLoader />
              <CommentLoader />
              <CommentLoader />
            </div>
          }
        </div>
      </div >
    );
  }
}

const mapStateToProps = (state) => {
  return {
    totalPages: state.exerciseComment.currentExerciseComments.totalPages,
    totalElements: state.exerciseComment.currentExerciseComments.totalElements,
    commentsList: state.exerciseComment.currentExerciseComments.data,
    isLoadDone: state.exerciseComment.currentExerciseComments.isLoadDone,
    isLoading: state.exerciseComment.currentExerciseComments.isLoading,
    isExerciseLoading: state.course.currentExercise.isLoading,
    exerciseData: state.course.currentExercise.data,
    isHaveDeleted: state.exerciseComment.isHaveDeleted,
    isHaveEdited: state.exerciseComment.isHaveEdited,
    isHaveReported: state.exerciseComment.isHaveReported,

  };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getAnExerciseComments,
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CommentSection));

