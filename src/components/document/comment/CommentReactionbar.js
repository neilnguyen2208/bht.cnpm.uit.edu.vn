import React from 'react'

import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { RequireLogin } from 'components/base_components/RequireLoginComponent'

//resources
import liked_icon from 'assets/icons/24x24/liked_icon_24x24.png'
import unliked_icon from 'assets/icons/24x24/unliked_icon_24x24.png'

//styles
import 'components/styles/Reactionbar.scss'
import 'components/styles/Label.scss'
import 'components/styles/Button.scss'
import 'components/styles/Comment.scss'

//utils
import { formatNumber, timeAgo } from 'utils/miscUtils.js'
import { CommentAction } from 'authentication/permission.config';
import { likeADocumentComment, unLikeADocumentComment } from 'redux/services/documentCommentServices'

class CommentReactionbar extends React.Component {

  constructor(props) {
    super(props);

    this.likeCount = -1; //dummy for change
    this.state = { isLiked: 0 };
  }

  toggleLikeImage = () => {
    let tmpLike = this.state.isLiked;

    if (tmpLike === 0)
      if (this.props.likeStatus) tmpLike = 1;
      else tmpLike = -1;

    tmpLike = - tmpLike;

    if (this.props.likeStatus) {
      if ((tmpLike === -1)) {
        this.likeCount = this.props.likeCount - 1;
        this.props.unLikeADocumentComment(this.props.commentId);
      }
      else {
        this.likeCount = this.props.likeCount;
        this.props.likeADocumentComment(this.props.commentId);
      }
    }
    else {
      if (tmpLike === 1) {
        this.likeCount = this.props.likeCount + 1
        this.props.likeADocumentComment(this.props.commentId);
      } else {
        this.props.unLikeADocumentComment(this.props.commentId);
        this.likeCount = this.props.likeCount;
      }
    }
    this.setState({ isLiked: tmpLike });
  }

  createCommentReply = () => {
    // append create reply component via  
    console.log("Create rpely in reactionbar called!");
    this.props.createCommentReply();
  }

  render() {
    //props.componentId: id of component; props.commentId: id of comment
    //#region like, unlike buttons
    let likeBtn = <div></div>;

    //render likeBtn
    if (this.state.isLiked === 1 || (this.state.isLiked === 0 && this.props.likeStatus)) {
      likeBtn = <img className="post-like-btn" alt="like" src={liked_icon}></img>
    }
    else {
      likeBtn = <img className="post-like-btn" alt="like" src={unliked_icon} ></img>
    }

    return (
      <div className="comment reaction-bar" >
        <div style={{ display: "flex" }}>
          <RequireLogin permissions={[]}
            availableActions={this.props.availableActions}
            requiredAction={CommentAction.Like}
            useAction={this.props.useAction}
            expectedEvent={this.props.type !== "PREVIEW" ? this.toggleLikeImage : () => { }} >
            <div className="like-btn-container">
              <div className="d-flex"> {likeBtn}</div>
              <div className="like-count">{formatNumber(this.likeCount === -1 ? this.props.likeCount : this.likeCount)}</div>
            </div>
          </RequireLogin>
          <RequireLogin permissions={[]}
            availableActions={this.props.availableActions}
            requiredAction={CommentAction.Reply}
            useAction={this.props.useAction}
            expectedEvent={this.props.type !== "PREVIEW" ? this.createCommentReply : () => { }} >
            <div className="comment-count-container">
              <div className="comment-btn-text">
                Trả lời
              </div>
              <div className="comment-btn-number">
                {this.props.commentCount && formatNumber(this.props.commentCount)}
              </div>
            </div>
          </RequireLogin>
        </div>
        <div className="comment-time">{timeAgo(this.props.submitDtm)}</div>
      </div >
    );
  }

}

const mapStateToProps = (state, ownProps) => {
  return {

  };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  likeADocumentComment, unLikeADocumentComment

}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CommentReactionbar));

