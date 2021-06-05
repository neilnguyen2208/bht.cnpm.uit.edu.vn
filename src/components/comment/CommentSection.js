import React from 'react'

import 'components/styles/Button.scss'

import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

//services
import { getAPostComments } from "redux/services/commentServices"

// import store from 'redux/store/index'
// import { validation } from 'utils/validationUtils'

//styles
import 'components/styles/Label.scss'
import 'components/styles/Metadata.scss'
import './Comment.scss'

//components
import Comment from './Comment.js'
import CreateComment from './CreateComment';
import CommentLoader from 'components/common/Loader/CommentLoader';
import Paginator from 'components/common/Paginator/ServerPaginator';
import store from 'redux/store';
import { openBLModal } from 'redux/services/modalServices';
import { delete_APostCommentReset, put_EditAPostCommentReset } from 'redux/actions/commentAction';

class CommentSection extends React.Component {

  componentDidMount() {
    this.props.getAPostComments(this.props.match.params.id, 0);
  }

  handleEditorChange = () => { }

  onPageChange = (pageNumber) => {
    this.pageNumber = pageNumber;
    this.props.getAPostComments(this.props.match.params.id, pageNumber - 1);
    this.setState({})
  }

  reloadList = () => {
    this.props.getAPostComments(this.props.match.params.id, this.pageNumber - 1);
  }

  render() {

    let commentsList = <></>;
    if (this.props.isHaveDeleted) {
      this.reloadList()
      openBLModal({ type: "success", text: "Xoá bình luận thành công!" });
      store.dispatch(delete_APostCommentReset())
    }

    if (this.props.isHaveEdited) {
      console.log("is have edited!");
      this.reloadList();
      openBLModal({ type: "success", text: "Chỉnh sửa bình luận thành công!" });
      store.dispatch(put_EditAPostCommentReset())
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
            idCmtAuthor={comment.authorID}
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
      <div className="comments-container">
        {this.props.postData && !this.props.isPostLoading ?
          <div className="section-title" id={"cst-" + this.props.match.params.id}>{this.props.postData.commentCount}   Bình luận</div>
          : <></>
        }
        {!this.props.isLoading && this.props.commentsList ?
          <div>
            <CreateComment postId={this.props.id} />
            {commentsList}
          </div>
          :
          <div>
            <CommentLoader />
            <CommentLoader />
            <CommentLoader />
          </div>
        }
      </div >
    );
  }
}

const mapStateToProps = (state) => {
  return {
    totalPages: state.comment.currentPostComments.totalPages,
    totalElements: state.comment.currentPostComments.totalElements,
    commentsList: state.comment.currentPostComments.data,
    isLoadDone: state.comment.currentPostComments.isLoadDone,
    isLoading: state.comment.currentPostComments.isLoading,
    isPostLoading: state.post.currentPost.isLoading,
    postData: state.post.currentPost.data,
    isHaveDeleted: state.comment.isHaveDeleted,
    isHaveEdited: state.comment.isHaveEdited,
  };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getAPostComments,
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CommentSection));

