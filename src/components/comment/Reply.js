import React from 'react'

import 'components/styles/Button.scss'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

//styles
import 'components/styles/Label.scss'
import 'components/styles/Metadata.scss'

//constants
import commentMenu from './adapter/commentMenu'

//components
import PopupMenu from 'components/common/PopupMenu/PopupMenu';
import createDOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';
import { RequireLogin } from 'components/base_components/RequireLoginComponent';
import { Post } from 'authentication/permission.config';
import { formatNumber, timeAgo } from 'utils/miscUtils';

import liked_icon from 'assets/icons/24x24/liked_icon_24x24.png'
import unliked_icon from 'assets/icons/24x24/unliked_icon_24x24.png'

class Reply extends React.Component {

  constructor(props) {
    super(props);
    this.likeCount = -1; //dummy for change
    this.state = { isLiked: 0 };
  }

  componentDidMount() {
    const window = new JSDOM('').window;
    const DOMPurify = createDOMPurify(window);

    const clean = DOMPurify.sanitize(this.props.content);
    if (document.querySelector(`#rp-ctnt-${this.props.replyId}.comment-content`))
      document.querySelector(`#rp-ctnt-${this.props.replyId}.comment-content`).innerHTML = clean;

  }

  createReplyReply = () => {
    this.props.createReplyReply(this.props.replyId);
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
        // this.props.unLikeAPost(this.props.id);
      }
      else {
        this.likeCount = this.props.likeCount;
        // this.props.likeAPost(this.props.id);
      }
    }
    else {
      if (tmpLike === 1) {
        this.likeCount = this.props.likeCount + 1
        // this.props.likeAPost(this.props.id);
      } else {
        // this.props.unLikeAPost(this.props.id);
        this.likeCount = this.props.likeCount;
      }
    }
    this.setState({ isLiked: tmpLike });
  }

  render() {

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
      <div className="reply-item" id={`reply-item-${this.props.replyId}`}>
        <div className="d-flex">
          <div className="comment-avatar reply"><img src="http://i9.photobucket.com/albums/a88/creaticode/avatar_1_zps8e1c80cd.jpg" alt="" /></div>
          <div className="comment-box">
            <div className="comment-head">
              <div>
                <div className="d-flex" >
                  <Link className="comment-name" to={`user/${this.props.authorID}`}>{this.props.authorDisplayName}</Link>
                  {this.props.isContentAuthor && <div className="by-author-label">
                    Tác giả
               </div>}
                </div>
              </div>
              <PopupMenu onMenuItemClick={this.onPopupMenuItemClick} items={commentMenu} id={`${this.props.popUpMenuPrefix}-cipm-${this.props.replyId}`} />
            </div>
            {/* comment content */}
            <div>
              <div className="comment-content ck-editor-output" id={"rp-ctnt-" + this.props.replyId} />
              <div className="comment reaction-bar" >
                <div style={{ display: "flex" }}>
                  <RequireLogin permissions={[Post.Comment.Reply.SetLikeStatus]} expectedEvent={this.props.type !== "PREVIEW" && this.toggleLikeImage} >
                    <div className="like-btn-container"  >
                      <div className="d-flex"> {likeBtn}</div>
                      <div className="like-count">{formatNumber(this.likeCount === -1 ? this.props.likeCount : this.likeCount)}</div>
                    </div>
                  </RequireLogin>
                  <RequireLogin permissions={[Post.Comment.Reply.Create]} expectedEvent={this.props.type !== "PREVIEW" && this.createReplyReply}>
                    <div className="comment-count-container">
                      <div className="comment-btn-text">
                        Trả lời
                       </div>
                    </div>
                  </RequireLogin>
                </div>
                <div className="comment-time">{timeAgo(this.props.submitDtm)}</div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ height: "0px", width: "0px" }} >
          <div className="triangle-with-shadow reply" />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    //report
  };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Reply));

