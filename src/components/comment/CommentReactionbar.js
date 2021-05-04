import React, { Component } from 'react'

import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { RequireLogin } from 'components/common/BaseComponents/RequireLoginComponent'

//resources
import liked_icon from 'assets/icons/24x24/liked_icon_24x24.png'
import unliked_icon from 'assets/icons/24x24/unliked_icon_24x24.png'

//styles
import 'components/styles/Reactionbar.scss'
import 'components/styles/Label.scss'
import 'components/styles/Button.scss'
import './Comment.scss'

//utils
import { formatNumber, timeAgo } from 'utils/miscUtils.js'

class CommentReactionbar extends Component {

  constructor(props) {
    super(props);

    this.likeCount = -1; //dummy for change
    this.state = { isLiked: 0 };
  }

  toggleLikeImage = () => {
    let tmpLike = this.state.isLiked;

    if (tmpLike === 0)
      if (this.props.likedStatus) tmpLike = 1;
      else tmpLike = -1;

    tmpLike = - tmpLike;

    if (this.props.likedStatus) {
      if ((tmpLike === -1)) {
        this.likeCount = this.props.likeCount - 1;
        this.props.unLikeAPost(this.props.id);
      }
      else {
        this.likeCount = this.props.likeCount;
        this.props.likeAPost(this.props.id);
      }
    }
    else {
      if (tmpLike === 1) {
        this.likeCount = this.props.likeCount + 1
        this.props.likeAPost(this.props.id);
      } else {
        this.props.unLikeAPost(this.props.id);
        this.likeCount = this.props.likeCount;
      }
    }
    this.setState({ isLiked: tmpLike });
  }

  render() {
    // 
    //#region like, unlike buttons
    let likeBtn = <div></div>;

    //render likeBtn
    if (this.state.isLiked === 1 || (this.state.isLiked === 0 && this.props.likedStatus)) {
      likeBtn = <img className="post-like-btn" alt="like" src={liked_icon}></img>
    }
    else {
      likeBtn = <img className="post-like-btn" alt="like" src={unliked_icon} ></img>
    }

    return (
      <div className="comment reaction-bar" >
        <div style={{ display: "flex" }}>
          < div >
            <RequireLogin permissions={["Page.Post.Comment"]} expectedEvent={this.props.type !== "PREVIEW" && this.toggleLikeImage} >
              <div className="like-btn-container"
              >
                <div className="d-flex"> {likeBtn}</div>
                <div className="like-count">{formatNumber(this.likeCount === -1 ? this.props.likeCount : this.likeCount)}</div>
              </div>
            </RequireLogin>
          </div>
          <div className="vertical-line" />
          <div className="comment-count-container">
            <div className="comment-btn-texwt">
              Trả lời
            </div>
            <div className="comment-btn-number">
              {this.props.commentCount && formatNumber(this.props.commentCount)}
            </div>
          </div>
        </div>

        <div className="comment-time">{timeAgo(this.props.createdTime)}</div>

      </div >
    );
  }

}

const mapStateToProps = (state, ownProps) => {
  return {
  };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CommentReactionbar));

