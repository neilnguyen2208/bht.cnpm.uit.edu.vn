import React from 'react'

import { Link, Redirect } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { likeAPost, unLikeAPost, saveAPost, unSaveAPost } from 'redux/services/postServices';
import { RequireLogin } from 'components/base_components/RequireLoginComponent'

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

//permissions config
import { Post, PostAction } from 'authentication/permission.config.js'
import authService from 'authentication/authServices';
import { getCKEInstance } from 'components/common/CustomCKE/CKEditorUtils';

class NormalReactionbar extends React.Component {

  constructor(props) {
    super(props);

    this.likeCount = -1; //dummy for change
    this.state = { isLiked: 0, isSaved: 0 };
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
        this.props.unLikeAPost(this.props.postId);
      }
      else {
        this.likeCount = this.props.likeCount;
        this.props.likeAPost(this.props.postId);
      }
    }
    else {
      if (tmpLike === 1) {
        this.likeCount = this.props.likeCount + 1
        this.props.likeAPost(this.props.postId);
      } else {
        this.props.unLikeAPost(this.props.postId);
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
        this.props.unSaveAPost(this.props.postId)
      }
      else {
        tmp = -1;
        this.props.saveAPost(this.props.postId)
      }
    else {
      if (tmp === 1)
        this.props.unSaveAPost(this.props.postId)
      else
        this.props.saveAPost(this.props.postId)
    }

    tmp = -tmp;

    //call API
    this.setState({ isSaved: tmp });
  }

  //handle if current route is post content
  onCommentBtnClick = () => {
    document.getElementById("cr-cmt") &&
      document.getElementById("cr-cmt").scrollIntoView()
    if (getCKEInstance('crt-cmmnt-cke')) {
      getCKEInstance('crt-cmmnt-cke').focus()
    }
  }

  render() {
    // 
    //#region like, unlike buttons
    let likeBtn = <div></div>;
    let saveBtn = <div></div>;

    //render likeBtn
    if (this.state.isLiked === 1 || (this.state.isLiked === 0 && this.props.likedStatus)) {
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
      <div className="reaction-bar" style={this.props.type === "DETAIL" ? { borderTop: "none", borderBottom: "1px var(--grayish) solid" } : {}}>
        <div className="d-flex mg-top-5px">

          <RequireLogin permissions={[]}
            availableActions={this.props.availableActions}
            requiredAction={PostAction.Like}
            useAction={this.props.useAction}
            expectedEvent={this.props.type !== "PREVIEW" ? () => this.toggleLikeImage() : () => { }}>
            <div className="like-btn-container">
              <div className="d-flex"> {likeBtn}</div>
              <div className="like-count">{formatNumber(this.likeCount === -1 ? this.props.likeCount : this.likeCount)}</div>
            </div>
          </RequireLogin>

          <div className="vertical-line" />

          <RequireLogin permissions={[]}
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
            <RequireLogin permissions={[]}
              availableActions={this.props.availableActions}
              requiredAction={PostAction.Comment}
              isLink={true}
              useAction={this.props.useAction}
              to={"/post-content/" + this.props.postId + "#cr-cmt"}
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
            <RequireLogin permissions={[Post.Comment.POSTCOMMENT_PUBLIC_SELF_CREATE]}
              availableActions={this.props.availableActions}
              requiredAction={PostAction.Comment}
              useAction={this.props.useAction}
              isLink={true}
              to={"/post-content/" + this.props.postId + "#cr-cmt"}
              expectedEvent={this.props.type !== "PREVIEW" && this.onCommentBtnClick}
            >
              {/* onClick={!authService.isGranted(Post.Comment.POSTCOMMENT_PUBLIC_SELF_CREATE) ? (e) => e.preventDefault() : () => { }}> */}
              <div className="comment-count-container">
                <div className="comment-btn-text">
                  Bình luận
                </div>
                <div className="comment-btn-number">
                  {formatNumber(this.props.commentCount)}
                </div>
              </div>
              {/* </Link> */}
            </RequireLogin>
          }

        </div>
        <Link to={`/post-content/${this.props.postId}`} className="continue-read mg-top-5px" >
          Đọc tiếp ...
        </Link>
      </div >
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NormalReactionbar));

