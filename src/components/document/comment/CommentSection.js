import React from 'react'

import 'components/styles/Button.scss'

import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

//services
import { getADocumentComments } from "redux/services/documentCommentServices"

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
import { delete_ADocumentCommentReset, post_ReportADocumentCommentReset, put_EditADocumentCommentReset } from 'redux/actions/documentCommentAction';
import { getADocumentStatisticByID } from 'redux/services/documentServices'
import { DocumentAction, CommentAction } from 'authentication/permission.config';

class CommentSection extends React.Component {

  componentDidMount() {
    this.props.getADocumentComments(this.props.match.params.id, 0);
  }

  handleEditorChange = () => { }

  onPageChange = (pageNumber) => {
    this.pageNumber = pageNumber;
    this.props.getADocumentComments(this.props.match.params.id, pageNumber - 1);
    this.setState({})
  }

  reloadList = () => {
    this.props.getADocumentComments(this.props.match.params.id, this.pageNumber - 1);
  }

  render() {

    let commentsList = <></>;
    if (this.props.isHaveDeleted) {
      this.reloadList()
      this.props.getADocumentStatisticByID(this.props.id);
      openBLModal({ type: "success", text: "Xoá bình luận thành công!" });
      store.dispatch(delete_ADocumentCommentReset())
    }

    if (this.props.isHaveEdited) {
      this.reloadList();
      openBLModal({ type: "success", text: "Chỉnh sửa bình luận thành công!" });
      store.dispatch(put_EditADocumentCommentReset())
    }

    if (this.props.isHaveReported) {
      openBLModal({ type: "success", text: "Báo cáo bình luận thành công!" });
      store.dispatch(post_ReportADocumentCommentReset())
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
            authorID={comment.authorID}
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
      <div className="comments-container">
        {this.props.documentData && !this.props.isDocumentLoading ?
          <div>
            <div className="section-title" id={"cst-" + this.props.match.params.id}>   Bình luận
            </div>
          </div>
          : <></>
        }
        {this.props.docAvailableActions.includes(DocumentAction.Comment) &&
          <CreateComment documentID={this.props.id} />}
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
      </div >
    );
  }
}

const mapStateToProps = (state) => {
  return {
    totalPages: state.documentComment.currentDocumentComments.totalPages,
    totalElements: state.documentComment.currentDocumentComments.totalElements,
    commentsList: state.documentComment.currentDocumentComments.data,
    isLoadDone: state.documentComment.currentDocumentComments.isLoadDone,
    isLoading: state.documentComment.currentDocumentComments.isLoading,
    isDocumentLoading: state.document.currentDocument.isLoading,
    documentData: state.document.currentDocument.data,
    isHaveDeleted: state.documentComment.isHaveDeleted,
    isHaveEdited: state.documentComment.isHaveEdited,
    isHaveReported: state.documentComment.isHaveReported,

  };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getADocumentComments,
  getADocumentStatisticByID
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CommentSection));

