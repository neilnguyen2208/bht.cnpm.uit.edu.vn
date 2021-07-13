import React from 'react'

import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { likeAPost, unLikeAPost, saveAPost, unSaveAPost } from 'redux/services/postServices';

//resources
import liked_icon from 'assets/icons/24x24/liked_icon_24x24.png'
import unliked_icon from 'assets/icons/24x24/unliked_icon_24x24.png'
import full_blue_bookmark_btn from 'assets/icons/24x24/b_blue_bookmark_icon_24x24.png'
import gray_bookmark_btn from 'assets/icons/24x24/nb_gray_bookmark_icon_24x24.png'

//styles
import 'components/styles/Reactionbar.scss'
import 'components/styles/Label.scss'
import 'components/styles/Button.scss'

//utils
import { formatNumber } from 'utils/miscUtils.js'
import { Post, PostAction } from 'authentication/permission.config';
import { RequireLogin } from 'components/base_components/RequireLoginComponent';

class HomeReactionbar extends React.Component {

  constructor(props) {
    super(props);

    this.likeCount = -1; //dummy for change
    this.state = { isLiked: 0, isSaved: 0 }
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
        this.props.unLikeAPost(this.props.postID);
      }
      else {
        this.likeCount = this.props.likeCount;
        this.props.likeAPost(this.props.postID);
      }
    }
    else {
      if (tmpLike === 1) {
        this.likeCount = this.props.likeCount + 1;
        this.props.likeAPost(this.props.postID);
      } else {
        this.props.unLikeAPost(this.props.postID);
        this.likeCount = this.props.likeCount;
      }
    }

    this.setState({ isLiked: tmpLike });
  }

  toggleSaveImage = () => {
    let tmp = this.state.isSaved;
    if (tmp === 0) //neu la lan dau load component
      if (this.props.savedStatus) {
        tmp = 1;
        this.props.unSaveAPost(this.props.postID)
      }
      else {
        tmp = -1;
        this.props.saveAPost(this.props.postID)
      }
    else {
      if (tmp === 1)
        this.props.unSaveAPost(this.props.postID)
      else
        this.props.saveAPost(this.props.postID)
    }

    tmp = -tmp;

    //call API
    this.setState({ isSaved: tmp });
  }

  render() {
    // 
    //#region like, unlike buttons
    let likeBtn = <div></div>;
    let saveBtn = <div></div>;

    //render likeBtn
    if (this.state.isLiked === 1 || (this.state.isLiked === 0 && this.props.likeStatus)) {
      likeBtn = <img className="post-like-btn" alt="like" src={liked_icon}></img>
    }
    else {
      likeBtn = <img className="post-like-btn" alt="like" src={unliked_icon} ></img>
    }

    //render saveBtn
    if (this.state.isSaved === 1 || (this.state.isSaved === 0 && this.props.savedStatus)) {
      saveBtn = <div className="d-flex">
        <img className="save-btn" alt="like" src={full_blue_bookmark_btn} />
        <div className="save-btn-text">Huỷ</div>
      </div>
    }
    else {
      saveBtn = <div className="d-flex" >
        <img className="save-btn" alt="dislike" src={gray_bookmark_btn} />
        <div className="save-btn-text">Lưu</div>
      </div >
    }

    return (
      <div>
        <Link to={`/post-content/${this.props.postID}`} className="continue-read" >
          Đọc tiếp ...
        </Link>
        <div className="reaction-bar">
          <div className="d-flex">

            <RequireLogin permissions={[Post.POST_PUBLIC_ALL_LIKE]}
              availableActions={this.props.availableActions}
              requiredAction={PostAction.Like}
              useAction={this.props.useAction}
              expectedEvent={this.props.type !== "PREVIEW" ? () => this.toggleLikeImage() : () => { }}>
              <div className="like-btn-container"  >
                <div> {likeBtn}</div>
                <div className="like-count">{formatNumber(this.likeCount === -1 ? this.props.likeCount : this.likeCount)}</div>
              </div>
            </RequireLogin>

            <div className="vertical-line" />
            <RequireLogin permissions={[Post.POST_PUBLIC_ALL_SAVE]}
              availableActions={this.props.availableActions}
              requiredAction={PostAction.Save}
              expectedEvent={this.props.type !== "PREVIEW" ? () => this.toggleSaveImage() : () => { }}
              useAction={this.props.useAction}     >
              <div className="save-btn-container"  >
                {saveBtn}
              </div>
            </RequireLogin>

            <div className="vertical-line" />
            {window.location.pathname.substring(0, 13) === "/post-content" || window.location.pathname === "/create-post" ?
              <RequireLogin permissions={[Post.POSTCOMMENT_PUBLIC_SELF_CREATE]}
                availableActions={this.props.availableActions}
                requiredAction={PostAction.Comment}
                isLink={true}
                useAction={this.props.useAction}
                to={"/post-content/" + this.props.postID + "#cr-cmt"}
                expectedEvent={this.props.type !== "PREVIEW" && this.onCommentBtnClick}>
                <div className="comment-count-container">
                  <div className="comment-btn-text">
                    Bình luận
                  </div>
                  <div className="comment-btn-number">
                    {formatNumber(this.props.commentCount)}
                  </div>
                </div>
              </RequireLogin>
              :
              <RequireLogin permissions={[Post.POSTCOMMENT_PUBLIC_SELF_CREATE]}
                availableActions={this.props.availableActions}
                requiredAction={PostAction.Comment}
                useAction={this.props.useAction}
                isLink={true}
                to={"/post-content/" + this.props.postID + "#cr-cmt"}
                expectedEvent={this.props.type !== "PREVIEW" && this.onCommentBtnClick}   >
                <div className="comment-count-container">
                  <div className="comment-btn-text">
                    Bình luận
                  </div>
                  <div className="comment-btn-number">
                    {formatNumber(this.props.commentCount)}
                  </div>
                </div>
              </RequireLogin>
            }

          </div>
          <div className="view-count-container">
            <div className="view-count" style={{ fontSize: "1rem", lineHeight: "0.9rem", marginTop: "-4px" }}  >{formatNumber(this.props.viewCount)} lượt xem</div>
          </div >
        </div >
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
  };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  saveAPost, unSaveAPost, likeAPost, unLikeAPost
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeReactionbar));

