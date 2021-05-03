import React, { Component } from 'react'

import 'components/styles/Button.scss'

import { bindActionCreators } from 'redux';
import { Link, withRouter } from "react-router-dom";
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

class CommentSection extends Component {

  componentDidMount() {
    this.props.getAPostComments(1);
  }

  render() {
    let commentsList = <ul id="comments-list" className="comments-list">
      {this.props.commentsList.map(comment => {
        return <Comment id={comment.id}
          cmtAuthorName={comment.cmtAuthorName}
          idCmtAuthor={comment.isCmtAuthorName}
          isContentAuthor={comment.isContentAuthor}
          createdTime={comment.createdTime}
          likeCount={comment.likeCount}
          isLiked={comment.isLiked}
          replyCount={comment.replyCount}
          replyArray={comment.replyArray}
          content={comment.content}
        />
      })}
    </ul >
    return (
      // cst:comment section title
      <div className="comments-container">
        <div className="section-title" id={"cst-" + this.props.match.params.id}> {this.props.totalElements} Bình luận</div>
        <div>
        </div>
        {commentsList}
      </div >
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state.comment);
  return {
    totalPages: state.comment.currentPostComments.totalPages,
    totalElements: state.comment.currentPostComments.totalElements,
    commentsList: state.comment.currentPostComments.data,
    isLoadDone: state.comment.currentPostComments.isLoadDone,

  };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getAPostComments
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CommentSection));
